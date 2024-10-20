import React from 'react'
import { Stack } from 'expo-router'

const TeamLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name='create' />
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name="category" options={{ headerShown: false }} />
                <Stack.Screen name="member" options={{ headerShown: false }} />
                <Stack.Screen name="comic" options={{ headerShown: false }} />
                <Stack.Screen name="post" options={{ headerShown: false }} />
                <Stack.Screen name="info" options={{ headerShown: false }} />
            </Stack>
        </>
    )
}

export default TeamLayout