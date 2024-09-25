import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants'

const Comic = () => {
    return (
        <SafeAreaView
            className={`flex-1 w-full h-full `}
            style={{ backgroundColor: Colors.Secondary_1 }}
        >
            <Text className='text-white'>Comics</Text>
        </SafeAreaView>
    )
}

export default Comic