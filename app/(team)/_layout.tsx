import React from 'react'
import { Stack } from 'expo-router'

const TeamLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name='create' />
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name="category-management" />
                <Stack.Screen name="member-management" />
                <Stack.Screen name="comic-management" />
                <Stack.Screen name="post-management" />
            </Stack>
        </>
    )
}

export default TeamLayout