import { Image, View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Images } from '@/constants/Images'
import { AuthWrapper, CustomBtn, CustomInput } from '@/components'
import { router } from 'expo-router'

const Register = () => {

    const [form, setForm] = useState({
        email: '',
        username: "",
        password: '',
        confirmPassword: ''
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
                    value={form.email}
                    onChangeText={(text) => setForm({ ...form, username: text })}
                    placeholder='Tên hiển thị'
                />

                <CustomInput
                    value={form.password}
                    onChangeText={(text) => setForm({ ...form, password: text })}
                    placeholder='Password'
                />

                <CustomInput
                    value={form.confirmPassword}
                    onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
                    placeholder='Confirm Password'
                />

                <View className='mt-8'>
                    <CustomBtn label='Đăng ký' />
                </View>

                <View className='items-center mt-6'>
                    <TouchableOpacity activeOpacity={0.7}
                        onPress={() => {
                            router.push('/login')
                        }}
                    >
                        <Text className='text-primary text-lg font-semibold'>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AuthWrapper>
    )
}

export default Register