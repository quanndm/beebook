import { Image, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Images } from '@/constants/Images'
import { AuthWrapper, CustomBtn, CustomInput } from '@/components'
import { router } from 'expo-router'
import { RegisterForm, User } from '@/types'
import { useMessageModalStore, useUserStore } from '@/store'
import { Appwrite } from '@/configs'

const Login = () => {
    // store
    const { setUser, setIsLoggedIn } = useUserStore()
    const { setinfoModal, closeModal, resetModal } = useMessageModalStore()

    // state
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [labelError, setLabelError] = useState("")
    const [form, setForm] = useState<Pick<RegisterForm, "email" | "password">>({
        email: '',
        password: ''
    })

    // handle
    const validateForm = () => {
        if (!form.email || !form.password) {
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

        return true
    }

    const onPressForgotPwd = () => {
        Alert.alert('Quên mật khẩu')
    }

    const onPressLogin = async () => {
        if (!validateForm()) return

        setLabelError("")
        setIsSubmitting(true)

        try {
            await Appwrite.auth.logIn(form.email, form.password)
            const result = Appwrite.auth.getCurrentUser()

            setUser((result as unknown) as User)
            setIsLoggedIn(true)

            setinfoModal({
                header: 'Thông báo',
                message: 'Đăng nhập thành công',
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
                message: `Đăng nhập thất bại: ${error.message}`,
                type: 'error',
                acceptAction: {
                    text: 'Đồng ý',
                    onPress: () => {
                        closeModal()
                        resetModal()
                    }
                }
            })
        } finally {
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
            <ScrollView>
                <View className='flex flex-col items-center'>
                    <Image
                        source={Images.beebook_icon}
                        className='w-14 h-14 rounded-lg'
                    />
                    <Text className='text-2xl font-bold mt-2 text-white'>Bee book</Text>
                </View>

                {labelError && <Text className='text-red-400 text-center my-2'>{labelError}</Text>}

                <View className='flex-1 h-full '>
                    <CustomInput
                        value={form.email}
                        onChangeText={(text) => setForm({ ...form, email: text })}
                        placeholder='Email'
                        keyboardType='email-address'
                    />

                    <CustomInput
                        value={form.password}
                        onChangeText={(text) => setForm({ ...form, password: text })}
                        placeholder='Password'
                        secureTextEntry
                    />

                    <View className='items-end my-4'>
                        <TouchableOpacity activeOpacity={0.7} onPress={onPressForgotPwd}>
                            <Text className='text-white'>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>

                    <View className='my-4'>
                        <CustomBtn label='Đăng nhập' handlePress={onPressLogin} isLoading={isSubmitting} />
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
                            router.replace('/home')
                        }}>
                            <Text className='text-primary underline decoration-4'>Bỏ qua phần đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </AuthWrapper>
    )
}

export default Login