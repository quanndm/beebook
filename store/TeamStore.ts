import { Team, TeamGlobalStore, TeamGlobalStoreActions } from "@/types";
import { create } from "zustand";


const useTeamStore = create<TeamGlobalStore & TeamGlobalStoreActions>((set) => ({
    team: null,
    setTeam: (team?: Team | null) => set((state) => ({ ...state, team: team ? { ...team } : null })),
    reset: () => set((state) => ({ team: null, isLoading: false }))
}))

export default useTeamStore