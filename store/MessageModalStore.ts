import { ActionBtn, AlertType, MessageModalProps } from '@/types';
import { create } from 'zustand'

interface MessageModalStore {
    modalVisible: boolean;
    header: string;
    message: string;
    type: AlertType;
    acceptAction: ActionBtn;
    cancelAction?: ActionBtn;
    setModalVisible: (visible: boolean) => void;
    setinfoModal: (modalVisible: boolean, info: MessageModalProps) => void;
    closeModal: () => void;
    resetModal: () => void;
}

const useMessageModalStore = create<MessageModalStore>((set) => ({
    modalVisible: false,
    header: 'header',
    message: 'message',
    type: 'info',
    acceptAction: { text: 'Ok', onPress: () => { } },
    cancelAction: undefined,
    setModalVisible: (visible) => set({ modalVisible: visible }),
    setinfoModal: (visible, info) => {
        set({ modalVisible: visible, header: info.header, message: info.message, type: info.type, acceptAction: info.acceptAction, cancelAction: info.cancelAction })
    },
    closeModal: () => set({ modalVisible: false }),
    resetModal: () => set({ header: '', message: '', type: 'info', })
}))

export default useMessageModalStore