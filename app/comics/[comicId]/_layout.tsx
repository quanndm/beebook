import { CustomIcon } from '@/components';
import { router, Stack } from 'expo-router';
import React from 'react'

const ComicDetailLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="index" />
                <Stack.Screen name="read" options={{ headerShown: false }} />
            </Stack>
        </>
    )
}

export default ComicDetailLayout