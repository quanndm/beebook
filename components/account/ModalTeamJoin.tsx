import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '@/constants'
import { CustomIcon } from '../common'



type ModalTeamJoinProps = {
    visible: boolean,
    setVisible: (visible: boolean) => void,
}

const ModalTeamJoin = (props: ModalTeamJoinProps) => {
    const { setVisible, visible } = props
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                alert('Modal has been closed.');
                setVisible(!visible);
            }}>
            <View className='flex-1 justify-center items-center mt-6 w-full '>
                <View className='m-5 rounded-xl p-3 items-center w-3/4' style={{ backgroundColor: Colors.Secondary }}>
                    <View className='w-full flex-row justify-end'>
                        <TouchableOpacity onPress={() => setVisible(!visible)} >
                            <CustomIcon name="close" size={26} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className='w-full'>
                        <TextInput
                            className=' p-2 my-3 rounded-lg w-full text-white'
                            style={{ backgroundColor: Colors.Secondary_3 }}
                            placeholderTextColor={"#fff"}
                            placeholder='Nhập mã mời'
                        />
                        <View className='flex items-center'>
                            <TouchableOpacity className='mb-3 w-1/2 p-3 rounded-lg' style={{ backgroundColor: Colors.Primary }} onPress={() => setVisible(!visible)} >
                                <Text className='text-white font-bold text-center'>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalTeamJoin