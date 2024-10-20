import React from 'react'
import { Stack } from 'expo-router'

const MemberLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name='index' />
            </Stack>
        </>
    )
}

export default MemberLayout