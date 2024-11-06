import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ChapterLayout = () => {
    return (
        <Stack>
            {/* <Stack.Screen name="index" /> */}
            {/* <Stack.Screen name="edit" /> */}
            <Stack.Screen name="create-novel" />
            <Stack.Screen name="create-comic" />
            <Stack.Screen name="[chapterId]" options={{ headerShown: false }} />


        </Stack>
    )
}

export default ChapterLayout