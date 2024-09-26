import { Image, View, Text,  TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Images } from '@/constants/Images'
import { AuthWrapper, CustomBtn, CustomInput } from '@/components'
import { router } from 'expo-router'

type LoginState = {
    email: string,
    password: string
}

const Login = () => {
    const [form, setForm] = useState<LoginState>({
        email: '',
        password: ''
    })

    return (
        <AuthWrapper
            headerImage={
                <Image
                    source={Images.bg_beebook}
                    style={{ flex: 1, width: undefined, height: undefined }}
                />
            }
        >
            <View className='flex flex-col items-center'>
                <Image
                    source={Images.beebook_icon}
                    className='w-14 h-14 rounded-lg'
                />
                <Text className='text-2xl font-bold mt-2 text-white'>Bee book</Text>
            </View>

            <View className='flex-1 h-full '>
                <CustomInput
                    value={form.email}
                    onChangeText={(text) => setForm({ ...form, email: text })}
                    placeholder='Email'
                />

                <CustomInput
                    value={form.password}
                    onChangeText={(text) => setForm({ ...form, password: text })}
                    placeholder='Password'
                />

                <View className='items-end my-4'>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Text className='text-white'>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>

                <View className='my-4'>
                    <CustomBtn label='Đăng nhập' />
                </View>

                <View className='flex-row items-center justify-center mt-4'>
                    <Text className='text-white '>Bạn chưa có tài khoản? </Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            router.push('/register')
                        }}
                    >
                        <Text className='text-primary'>Đăng ký</Text>
                    </TouchableOpacity>
                </View>

                <View className='items-center mt-2'>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        router.push('/home')
                    }}>
                        <Text className='text-primary underline decoration-4'>Bỏ qua phần đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AuthWrapper>
    )
}

export default Login