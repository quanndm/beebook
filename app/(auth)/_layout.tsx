
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='login'
                options={{
                    headerShown: false,
                    title: 'Login'
                }}
            />
            <Stack.Screen
                name='register'
                options={{
                    headerShown: false,
                    title: 'Register'
                }}
            />
            <Stack.Screen
                name='account-setting'
                options={{
                    headerShown: true,
                    title: 'Cài đặt tài khoản'
                }}
            />
            <Stack.Screen
                name='modified-avatar'
                options={{
                    headerShown: true,
                    title: 'Thay đổi ảnh đại diện'
                }}
            />
            <Stack.Screen
                name='modified-password'
                options={{
                    headerShown: true,
                    title: 'Thay đổi mật khẩu'
                }}
            />
        </Stack>
    )
}

export default AuthLayout