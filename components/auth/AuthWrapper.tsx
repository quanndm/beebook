import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthWrapperProps } from '@/types'



const AuthWrapper = (props: AuthWrapperProps) => {
    const { headerImage, children, customContainerStyle, customContainerClassName } = props
    return (
        <SafeAreaView className={`w-full h-full flex-1 bg-secondary ${customContainerClassName}`} style={customContainerStyle}>
            <View className='w-full h-[25%] overflow-hidden'>
                {headerImage}
            </View>

            <View className='flex-1 p-8 overflow-hidden rounded-t-3xl bg-secondary  -top-8'>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default AuthWrapper