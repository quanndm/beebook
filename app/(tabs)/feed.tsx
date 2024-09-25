import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants'

const Feed = () => {
    return (
        <SafeAreaView
            className={`flex-1 w-full h-full `}
            style={{ backgroundColor: Colors.Secondary_1 }}
        >
            <Text>Feed</Text>
        </SafeAreaView>
    )
}

export default Feed