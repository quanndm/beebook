import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Colors } from '@/constants'

const TranslateTeam = () => {
    return (
        <SafeAreaView
            className={`flex-1 w-full h-full `}
            style={{ backgroundColor: Colors.Secondary_1 }}
        >
            <Text className='text-white'>TranslateTeam</Text>
        </SafeAreaView>
    )
}

export default TranslateTeam