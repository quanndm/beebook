import { Stack } from 'expo-router';
import React from 'react'

const ComicDetailLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="index" />
                <Stack.Screen name="read" />
            </Stack>
        </>
    )
}

export default ComicDetailLayout