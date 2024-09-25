import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomBtnProps } from '@/types'



const CustomBtn = (props: CustomBtnProps) => {
    const { label, handlePress, isLoading } = props
    return (
        <TouchableOpacity className='bg-primary rounded-3xl  min-h-[60px] items-center justify-center'
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <Text className='text-white text-lg tracking-wide'>{label}</Text>
        </TouchableOpacity>
    )
}

export default CustomBtn