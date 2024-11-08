

export type SearchGlobalStore = {
    query: string | null
}

export type SearchGlobalStoreActions = {
    setQuery: (query: string) => void
    reset: () => void
}