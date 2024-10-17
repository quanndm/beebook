import React from 'react'
import { Stack } from 'expo-router'

const TeamLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name='create' />
                <Stack.Screen name='index' />
            </Stack>
        </>
    )
}

export default TeamLayout