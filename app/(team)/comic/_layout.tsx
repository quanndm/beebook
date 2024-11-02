import React from 'react'
import { Stack } from 'expo-router'

const ComicLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="index" />
                <Stack.Screen name="create" />
                <Stack.Screen name="update-info" />
                <Stack.Screen name="[comicId]" options={{ headerShown: false }} />
            </Stack>
        </>
    )
}

export default ComicLayout