import { Stack } from 'expo-router';

import React from 'react'

const ComicLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="discover" />
                <Stack.Screen name="[comicId]" options={{ headerShown: false, }} />
            </Stack>
        </>
    )
}

export default ComicLayout