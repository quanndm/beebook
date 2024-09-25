import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants'

const Home = () => {
    return (
        <SafeAreaView
            className={`flex-1 w-full h-full`}
            style={{ backgroundColor: Colors.Secondary_1 }}
        >
            <ScrollView className='flex-1 w-full h-full'>
                {/* Slider */}
                <View></View>

                {/* Categories */}
                <View className='flex-1 w-full '>
                    <View>

                    </View>

                </View>

                {/* New update */}
                <View></View>

                {/* ranking comics */}
                <View></View>

                {/* New Comic */}
                <View></View>

                {/* some hot categories */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home