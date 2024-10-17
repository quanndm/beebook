import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants'
import { router, Stack } from 'expo-router'
import { CustomIcon } from '@/components'

const Notification = () => {
    return (
        <SafeAreaView
            className={`flex-1 w-full h-full`}
            style={{ backgroundColor: Colors.Secondary_1 }}
        >
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: Colors.Secondary_2 },
                    headerTitleStyle: { color: "#fff" },
                    headerLeft: (props) => (
                        <CustomIcon
                            name='arrow-back-outline'
                            size={26}
                            onPress={() => router.back()}
                            className='mr-4'
                            color={"white"}
                        />
                    ),
                }}

            />
        </SafeAreaView>
    )
}

export default Notification