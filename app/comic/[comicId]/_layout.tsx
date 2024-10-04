import { CustomIcon } from '@/components';
import { router, Stack } from 'expo-router';
import React from 'react'

const ComicDetailLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{
                    headerLeft: (props) => (
                        <CustomIcon
                            name='arrow-back-outline'
                            size={24}
                            onPress={() => router.replace("/(tabs)/home")}
                            className='mr-4'
                        />
                    ),
                }} />
                <Stack.Screen name="read" />
            </Stack>
        </>
    )
}

export default ComicDetailLayout