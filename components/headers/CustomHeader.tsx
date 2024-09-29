import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Colors, Images } from '@/constants'
import { CustomIcon } from '../common/CustomIcon'
import { CustomHeaderProps } from '@/types'

const CustomHeader = (props: CustomHeaderProps) => {
    const { label, showSearch, openSearchModal } = props

    return (
        <View className='flex flex-row justify-between w-full h-[80px] px-5 py-4 ' style={{ backgroundColor: Colors.Secondary }}>
            <View className='flex gap-2 flex-row items-center'>
                <Image
                    source={Images.beebook_icon}
                    resizeMode='contain'
                    className='w-10 h-10 rounded-lg'
                />
                <Text className='text-xl font-bold text-white'>{label}</Text>
            </View>

            <View className='flex flex-row items-center gap-4 '>
                <View className='w-[1px] bg-gray-500 h-10'></View>
                {showSearch &&
                    <TouchableOpacity
                        onPress={openSearchModal}
                    >
                        <CustomIcon name='search-outline' color='white' size={28} />
                    </TouchableOpacity>
                }

                <TouchableOpacity
                    onPress={() => Alert.alert('Notification', 'Notification')}
                >
                    <CustomIcon name='notifications-outline' color='white' size={28} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomHeader
