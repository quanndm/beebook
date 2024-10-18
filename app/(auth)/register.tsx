import { Image, View, Text, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Images } from '@/constants/Images'
import { AuthWrapper, CustomBtn, CustomInput } from '@/components'
import { router } from 'expo-router'
import { RegisterForm, User } from '@/types'
import { Appwrite } from '@/configs'
import { useMessageModalStore, useUserStore } from '@/store'

const Register = () => {
    // store
    const { setUser, setIsLoggedIn } = useUserStore()
    const { setinfoModal, closeModal, resetModal } = useMessageModalStore()

    // state
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [labelError, setLabelError] = useState("")
    const [form, setForm] = useState<RegisterForm>(
        {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    )

    // handle
    const validateForm = () => {
        if (!form.email || !form.username || !form.password || !form.confirmPassword) {
            setLabelError("Vui lòng nhập đầy đủ thông tin")
            return false
        }

        if (!form.email.match("[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})")) {
            setLabelError("Email không hợp lệ")
            return false
        }

        if (form.password.length < 8) {
            setLabelError("Mật khẩu phải có ít nhất 8 ký tự")
            return false
        }

        if (form.password !== form.confirmPassword) {
            setLabelError("Mật khẩu không trùng khớp")
            return false
        }

        return true
    }

    const onPressRegister = async () => {
        if (!validateForm()) return

        setLabelError("")
        setIsSubmitting(true)

        // call api register
        try {
            const result = await Appwrite.auth.createUser(form)

            // Save to global state
            setUser((result as unknown) as User)
            setIsLoggedIn(true)
            // redirect to home
            setinfoModal({
                header: 'Thông báo',
                message: 'Đăng ký thành công',
                type: 'success',
                acceptAction: {
                    text: 'Đồng ý',
                    onPress: () => {
                        router.replace('/home')
                        closeModal()
                        resetModal()
                    }
                }
            })
        } catch (error: any) {
            setinfoModal({
                header: 'Thông báo',
                message: `Đăng ký thất bại: ${error.message}`,
                type: 'error',
                acceptAction: {
                    text: 'Đồng ý',
                    onPress: () => {
                        closeModal()
                        resetModal()
                    }
                }
            })
        }
        finally {
            setIsSubmitting(false)
        }
    }
    return (
        <AuthWrapper
            headerImage={
                <Image
                    source={Images.bg_beebook}
                    style={{ flex: 1, width: undefined, height: undefined }}
                />
            }
        >
            <ScrollView automaticallyAdjustKeyboardInsets={true}>
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
                        value={form.username}
                        onChangeText={(text) => setForm({ ...form, username: text })}
                        placeholder='Tên hiển thị - Viết liền không dấu'
                    />

                    <CustomInput
                        value={form.password}
                        onChangeText={(text) => setForm({ ...form, password: text })}
                        placeholder='Password'
                        secureTextEntry
                    />

                    <CustomInput
                        value={form.confirmPassword}
                        onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
                        placeholder='Confirm Password'
                        secureTextEntry
                    />

                    <View className='mt-8'>
                        <CustomBtn label='Đăng ký' isLoading={isSubmitting} handlePress={onPressRegister} />
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
            </ScrollView>
        </AuthWrapper>
    )
}

export default Register