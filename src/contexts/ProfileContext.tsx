import { createContext, ReactNode, useEffect, useState } from "react";
import { Api } from "../services/Api";

interface ProfileProviderProps {
    children: ReactNode;
}

type ProfileContextData = {
    amountRepositories: number;
    listRepositories: RepositoriesProps[];
    listRepositoriesCurrentPage: number;
    loadingRepositories: boolean;
    loadMoreRepositories: () => void;
};

type RepositoriesProps = {
    name: string;
    html_url: string;
    description: string | null;
    homepage: string | null;
};

export const ProfileContext = createContext({} as ProfileContextData);

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
    const [amountRepositories, setAmountRepositories] = useState(0);
    const [listRepositories, setListRepositories] = useState<
        RepositoriesProps[]
    >([]);
    const [listRepositoriesCurrentPage, setListRepositoriesCurrentPage] =
        useState(1);
    const [loadingRepositories, setLoadingRepositories] = useState(false);

    function loadMoreRepositories() {
        listRepositoriesCurrentPage <= Math.ceil(amountRepositories / 5) &&
            setListRepositoriesCurrentPage(listRepositoriesCurrentPage + 1);
    }

    useEffect(() => {
        setLoadingRepositories(true);
        function getAllRepositories() {
            setTimeout(async () => {
                const userReq = await Api.get("users/davidalexandre");
                const amountRepos = await userReq.data.public_repos;
                setAmountRepositories(amountRepos);
                const reposReq = await Api.get("users/davidalexandre/repos");
                const listRepos = await reposReq.data.splice(
                    0,
                    5 * listRepositoriesCurrentPage
                );
                setListRepositories(listRepos);
                setLoadingRepositories(false);
            }, 1000);
        }
        getAllRepositories();
    }, [listRepositoriesCurrentPage]);

    return (
        <ProfileContext.Provider
            value={{
                amountRepositories,
                listRepositories,
                listRepositoriesCurrentPage,
                loadingRepositories,
                loadMoreRepositories,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};
