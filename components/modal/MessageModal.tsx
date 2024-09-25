import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomIcon } from '../common/CustomIcon'
import { Colors } from '@/constants'
import { MessageModalProps } from '@/types'
import { useMessageModalStore } from '@/store'



const MessageModal = () => {
    // const { type, header, message, cancelAction, acceptAction } = props
    const { header, message, type, modalVisible, acceptAction, cancelAction } = useMessageModalStore()
    const getIcon = (type: string) => {
        switch (type) {
            case 'info':
                return 'information-circle-outline'
            case 'warning':
                return 'alert-circle-outline'
            case 'error':
                return 'close-circle-outline'
            case 'success':
                return 'checkmark-circle-outline'
            default:
                return 'information-circle-outline'
        }
    }
    const getBg = (type: string) => {
        switch (type) {
            case 'info':
                return 'bg-blue-400'
            case 'warning':
                return 'bg-yellow-500'
            case 'error':
                return 'bg-red-400'
            case 'success':
                return 'bg-green-400'
            default:
                return 'bg-blue-400'
        }
    }

    return (
        <Modal
            visible={modalVisible}
            animationType='fade'
            transparent={true}
        >
            <View className='flex-1 justify-center items-center'>
                <View className='w-3/4 rounded-lg pb-4' style={{ backgroundColor: Colors.Secondary_2 }}>
                    <View className='flex justify-center items-center relative mb-12'>
                        <View className={`w-20 h-20 items-center justify-center rounded-full absolute ${getBg(type)}`}>
                            <CustomIcon name={getIcon(type)} size={70} color={"white"} />
                        </View>
                    </View>

                    <View className='items-center px-2 mb-4'>
                        <Text className='font-bold text-white text-2xl mb-2'>{header}</Text>
                        <Text className='text-white text-base'>
                            {message}
                        </Text>
                    </View>

                    <View className={`${cancelAction ? "px-2 flex-row justify-evenly" : "px-4"} `}>
                        {cancelAction &&
                            <TouchableOpacity
                                className='w-fit p-3 rounded-lg bg-gray-500 justify-center items-center' activeOpacity={0.7}
                                onPress={() => cancelAction.onPress()}
                            >
                                <Text className='text-white text-base font-semibold'>{cancelAction.text}</Text>
                            </TouchableOpacity>
                        }

                        <TouchableOpacity
                            className={`w-fit p-3 rounded-lg justify-center items-center ${getBg(type)}`} activeOpacity={0.7}
                            onPress={() => acceptAction.onPress()}
                        >
                            <Text className='text-white text-base font-semibold'>{acceptAction.text}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default MessageModal