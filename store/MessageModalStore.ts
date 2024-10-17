import { MessageModalStore, MessageModalStoreActions } from '@/types';
import { create } from 'zustand'

const useMessageModalStore = create<MessageModalStore & MessageModalStoreActions>((set) => ({
    modalVisible: false,
    header: 'header',
    message: 'message',
    type: 'info',
    acceptAction: { text: 'Ok', onPress: () => { } },
    cancelAction: undefined,
    setModalVisible: (visible) => set({ modalVisible: visible }),
    setinfoModal: (info) => {
        set({ modalVisible: true, header: info.header, message: info.message, type: info.type, acceptAction: info.acceptAction, cancelAction: info.cancelAction })
    },
    closeModal: () => set({ modalVisible: false }),
    resetModal: () => set({ header: '', message: '', type: 'info', })
}))

export default useMessageModalStore