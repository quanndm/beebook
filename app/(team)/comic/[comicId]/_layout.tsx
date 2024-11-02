import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ComicDetailLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="edit" />
        </Stack>
    )
}

export default ComicDetailLayout