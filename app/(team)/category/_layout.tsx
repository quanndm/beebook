import React from 'react'
import { Stack } from 'expo-router'

const CategoryLayout = () => {
    return (
       <>
            <Stack>
                <Stack.Screen name="index" />
            </Stack>
       </>
    )
}

export default CategoryLayout