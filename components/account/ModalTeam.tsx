import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants'
import { CustomIcon } from '../common'
import { router } from 'expo-router'

type ModalTeamProps = {
    visible: boolean,
    setVisible: (visible: boolean) => void,
    setVisibleModalJoin(visible: boolean): void
}

const ModalTeam = (props: ModalTeamProps) => {
    const { visible, setVisible, setVisibleModalJoin } = props
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

                    <TouchableOpacity
                        className='rounded-lg p-3  my-4 w-full'
                        style={{ backgroundColor: Colors.Secondary_3 }}
                        onPress={() => {
                            setVisible(!visible)
                            setVisibleModalJoin(true)
                        }}>
                        <Text className='text-white font-bold text-center'>Tham gia nhóm dịch</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className='rounded-lg p-3 w-full  mb-4'
                        style={{ backgroundColor: Colors.Secondary_3 }}
                        onPress={() => {
                            setVisible(!visible)
                            // setHasTeam(true)
                            router.push('/(team)/create')
                        }}>
                        <Text className='text-white font-bold text-center'>Đăng ký nhóm mới</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalTeam