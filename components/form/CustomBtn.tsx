import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomBtnProps } from '@/types'
import { MaterialIndicator } from 'react-native-indicators'


const CustomBtn = (props: CustomBtnProps) => {
    const { label, handlePress, isLoading } = props
    return (
        <TouchableOpacity className='bg-primary rounded-3xl  min-h-[60px] items-center justify-center'
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <View className='flex-row items-center justify-center'>
                {isLoading && (
                    <View className='mr-2'>
                        <MaterialIndicator size={18} color="#fff" />
                    </View>
                )}
                <Text className='text-white text-lg tracking-wide'>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomBtn