import { Stack } from 'expo-router';
import React from 'react'

const ComicReadLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="[chapterId]" />
            </Stack>
        </>
    )
}

export default ComicReadLayout