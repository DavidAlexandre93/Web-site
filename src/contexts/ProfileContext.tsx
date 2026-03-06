import {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
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
    loadMoreRepositories: () => void;
    retryLoadRepositories: () => void;
};

type RepositoriesProps = {
    name: string;
    html_url: string;
    description: string | null;
    homepage: string | null;
};

const REPOSITORIES_PER_PAGE = 5;

export const ProfileContext = createContext({} as ProfileContextData);

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
    const [amountRepositories, setAmountRepositories] = useState(0);
    const [listRepositories, setListRepositories] = useState<RepositoriesProps[]>([]);
    const [listRepositoriesCurrentPage, setListRepositoriesCurrentPage] = useState(1);
    const [loadingRepositories, setLoadingRepositories] = useState(false);
    const [repositoriesError, setRepositoriesError] = useState<string | null>(null);

    const loadMoreRepositories = useCallback(() => {
        setListRepositoriesCurrentPage((currentPage) => {
            const maxPages = Math.ceil(amountRepositories / REPOSITORIES_PER_PAGE);

            if (currentPage >= maxPages) {
                return currentPage;
            }

            return currentPage + 1;
        });
    }, [amountRepositories]);

    const retryLoadRepositories = useCallback(() => {
        setRepositoriesError(null);
        setListRepositoriesCurrentPage(1);
    }, []);

    useEffect(() => {
        let isMounted = true;

        async function getAllRepositories() {
            setLoadingRepositories(true);
            setRepositoriesError(null);

            try {
                const [userResponse, repositoriesResponse] = await Promise.all([
                    Api.get("users/DavidAlexandre93"),
                    Api.get("users/DavidAlexandre93/repos", {
                        params: {
                            per_page: REPOSITORIES_PER_PAGE * listRepositoriesCurrentPage,
                            sort: "updated",
                        },
                    }),
                ]);

                if (!isMounted) {
                    return;
                }

                setAmountRepositories(userResponse.data.public_repos);
                setListRepositories(repositoriesResponse.data);
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                console.error("Erro ao carregar repositórios:", error);
                setRepositoriesError("Falha ao carregar os repositórios.");
                setListRepositories([]);
            } finally {
                if (isMounted) {
                    setLoadingRepositories(false);
                }
            }
        }

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
                loadMoreRepositories,
                retryLoadRepositories,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};
