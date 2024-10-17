import { Team } from "./Team";

export type User = {
    $id: string;
    $permissions: string[];
    accountId: string;
    username: string;
    email: string;
    avatar: string;
    avatarId?: string;
    translationTeams?: Team;

}

export type UserGlobalState = {
    user?: User | null;
    isLoading: boolean;
    isLoggedIn: boolean;
}

export type UserGlobalStoreActions = {
    setIsLoading: (bool: boolean) => void
    setIsLoggedIn: (bool: boolean) => void
    setUser: (user?: User | null) => void
    setAvatar: (image: string, fileId: string) => void
    reset: () => void
}