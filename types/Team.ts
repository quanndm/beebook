import { User } from "./User";
import * as ImagePicker from 'expo-image-picker';

export type Team = {
    $id: string;
    name: string;
    avatar: string;
    avatarId?: string;
    members: User[];
    owner: User;
    dateCreated: string;
    invitationCode: string;
}

export type FormCreateTeam = {
    name: string;
    file: ImagePicker.ImagePickerAsset;
    owner: User;
    invitationCode: string;
}

export type TeamGlobalStore = {
    team?: Team | null
}

export type TeamGlobalStoreActions = {
    setTeam: (team?: Team | null) => void,
    reset: () => void
}