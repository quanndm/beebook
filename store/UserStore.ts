import { create } from 'zustand'
import { User, UserGlobalState, UserGlobalStoreActions } from "../types"

const useUserStore = create<UserGlobalState & UserGlobalStoreActions>((set) => ({
    user: null,
    isLoading: true,
    isLoggedIn: false,
    setIsLoading: (bool: boolean) => set((state) => ({ ...state, isLoading: bool })),
    setIsLoggedIn: (bool: boolean) => set((state) => ({ ...state, isLoggedIn: bool })),
    setUser: (user?: User | null) => set((state) => ({ ...state, user: user ? { ...user } : null })),
    setAvatar: (image: string) => set((state) => ({ ...state, user: state.user ? { ...state.user, avatar: image } : null })),
    reset: () => set((state) => ({ ...state, user: null, isLoggedIn: false })),
}));


export default useUserStore