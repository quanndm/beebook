import { SearchGlobalStore, SearchGlobalStoreActions } from "@/types";
import { create } from "zustand";

const useSearchStore = create<SearchGlobalStore & SearchGlobalStoreActions>((set) => ({
    query: "",
    setQuery: (query: string) => set({ query }),
    reset: () => set({ query: "" }),
}));

export default useSearchStore