import { ActionBtn, AlertType, MessageModalProps } from "./Common";

export interface MessageModalStore {
    modalVisible: boolean;
    header: string;
    message: string;
    type: AlertType;
    acceptAction: ActionBtn;
    cancelAction?: ActionBtn;

}

export interface MessageModalStoreActions {
    setModalVisible: (visible: boolean) => void;
    setinfoModal: (info: MessageModalProps) => void;
    closeModal: () => void;
    resetModal: () => void;
}
