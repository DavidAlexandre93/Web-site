import {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { Api } from "@/services";

interface ProfileProviderProps {
    children: ReactNode;
}

type ProfileContextData = {
    amountRepositories: number;
    listRepositories: RepositoriesProps[];
    listRepositoriesCurrentPage: number;
    loadingRepositories: boolean;
    repositoriesError: string | null;
    hasMoreRepositories: boolean;
    loadMoreRepositories: () => void;
    retryLoadRepositories: () => void;
};

type RepositoriesProps = {
    name: string;
    html_url: string;
    description: string | null;
    homepage: string | null;
    default_branch: string;
    owner: {
        login: string;
    };
};

const REPOSITORIES_PER_PAGE = 5;
const GITHUB_USERNAME = "DavidAlexandre93";

export const ProfileContext = createContext({} as ProfileContextData);

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
    const [amountRepositories, setAmountRepositories] = useState(0);
    const [listRepositories, setListRepositories] = useState<RepositoriesProps[]>([]);
    const [listRepositoriesCurrentPage, setListRepositoriesCurrentPage] = useState(1);
    const [loadingRepositories, setLoadingRepositories] = useState(false);
    const [repositoriesError, setRepositoriesError] = useState<string | null>(null);
    const [hasMoreRepositories, setHasMoreRepositories] = useState(true);

    const shouldLoadUserRef = useRef(true);

    const loadMoreRepositories = useCallback(() => {
        setListRepositoriesCurrentPage((currentPage) => {
            if (!hasMoreRepositories || loadingRepositories) {
                return currentPage;
            }

            return currentPage + 1;
        });
    }, [hasMoreRepositories, loadingRepositories]);

    const retryLoadRepositories = useCallback(() => {
        shouldLoadUserRef.current = true;
        setRepositoriesError(null);
        setHasMoreRepositories(true);
        setListRepositories([]);
        setListRepositoriesCurrentPage(1);
    }, []);

    useEffect(() => {
        let isMounted = true;

        const getAllRepositories = async () => {
            setLoadingRepositories(true);
            setRepositoriesError(null);

            try {
                const requests = [
                    Api.get(`users/${GITHUB_USERNAME}/repos`, {
                        params: {
                            per_page: REPOSITORIES_PER_PAGE,
                            page: listRepositoriesCurrentPage,
                            sort: "updated",
                        },
                    }),
                ];

                if (shouldLoadUserRef.current) {
                    requests.push(Api.get(`users/${GITHUB_USERNAME}`));
                }

                const responses = await Promise.all(requests);

                if (!isMounted) {
                    return;
                }

                const repositoriesResponse = responses[0];
                const userResponse = responses[1];

                if (userResponse) {
                    setAmountRepositories(userResponse.data.public_repos || 0);
                    shouldLoadUserRef.current = false;
                }

                const repositories = (repositoriesResponse.data || []) as RepositoriesProps[];

                setListRepositories((currentRepositories) => {
                    const seenRepositories = new Set(currentRepositories.map((repo) => repo.html_url));
                    const newRepositories = repositories.filter((repo) => !seenRepositories.has(repo.html_url));

                    return [...currentRepositories, ...newRepositories];
                });

                setHasMoreRepositories(repositories.length === REPOSITORIES_PER_PAGE);
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                console.error("Erro ao carregar repositórios:", error);
                setRepositoriesError("Falha ao carregar os repositórios.");
            } finally {
                if (isMounted) {
                    setLoadingRepositories(false);
                }
            }
        };

        getAllRepositories();

        return () => {
            isMounted = false;
        };
    }, [listRepositoriesCurrentPage]);

    return (
        <ProfileContext.Provider
            value={{
                amountRepositories,
                listRepositories,
                listRepositoriesCurrentPage,
                loadingRepositories,
                repositoriesError,
                hasMoreRepositories,
                loadMoreRepositories,
                retryLoadRepositories,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};
