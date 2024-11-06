import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ChapterDetailLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="update" />
        </Stack>
    )
}

export default ChapterDetailLayout