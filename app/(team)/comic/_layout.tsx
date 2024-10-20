import React from 'react'
import { Stack } from 'expo-router'

const ComicLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="index" />
            </Stack>
        </>
    )
}

export default ComicLayout