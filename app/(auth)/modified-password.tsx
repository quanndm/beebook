import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants'
import { CustomBtn, CustomIcon, CustomInput } from '@/components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIndicator } from 'react-native-indicators'
import { Appwrite } from '@/configs'

const ModifiedPassword = () => {

    const [form, setform] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [isUpdating, setIsUpdating] = useState(false)
    const [deleteAllSessionOpt, setDeleteAllSessionOpt] = useState(false)
    const validate = () => {
        if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin")
            return false
        }

        if (form.newPassword !== form.confirmPassword) {
            alert("Mật khẩu không trùng khớp")
            return false
        }

        return true
    }
    const handleUpdatePassword = async () => {
        if (!validate()) return

        setIsUpdating(true)
        try {
            // call api update password
            await Appwrite.auth.updatePassword(form.oldPassword, form.newPassword)

            if (deleteAllSessionOpt) {
                await Appwrite.auth.logOutAllSessions()
            }

            Alert.alert('Thông báo', 'Cập nhật mật khẩu thành công\nVui lòng đăng nhập lại')
            router.replace('/(auth)/login')
        } catch (error) {
            console.error(error)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: Colors.Secondary },
                    headerTitleStyle: { color: "#fff" },
                    headerLeft: (props) => (
                        <CustomIcon
                            name='arrow-back-outline'
                            size={26}
                            onPress={() => router.back()}
                            className='mr-4'
                            color={"white"}

                        />
                    ),
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={handleUpdatePassword} disabled={isUpdating} className='py-1.5 px-4 bg-primary items-center justify-start rounded-md flex-row' activeOpacity={0.8}>
                                {isUpdating && (
                                    <View className='mr-2'>
                                        <MaterialIndicator size={18} color="#fff" />
                                    </View>
                                )}
                                <Text className='text-white text-base font-semibold'>
                                    Lưu
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
            < SafeAreaView className='w-full h-full flex-1 p-4' style={{ backgroundColor: Colors.Secondary_1 }}>
                <View className='mt-8 p-4 rounded-2xl ' style={{ backgroundColor: Colors.Secondary_2 }}>

                    <View className='w-full'>
                        <Text className='text-white text-base font-bold'>Mật khẩu cũ</Text>
                        <CustomInput
                            value={form.oldPassword}
                            onChangeText={(text) => setform({ ...form, oldPassword: text })}
                            secureTextEntry
                            heightInput={50}
                        />
                    </View>

                    <View className='w-full'>
                        <Text className='text-white text-base font-bold'>Mật khẩu mới</Text>
                        <CustomInput
                            value={form.newPassword}
                            onChangeText={(text) => setform({ ...form, newPassword: text })}
                            secureTextEntry
                            heightInput={50}
                        />
                    </View>

                    <View className='w-full'>
                        <Text className='text-white text-base font-bold'>Nhập lại mật khẩu</Text>
                        <CustomInput
                            value={form.confirmPassword}
                            onChangeText={(text) => setform({ ...form, confirmPassword: text })}
                            secureTextEntry
                            heightInput={50}
                        />
                    </View>

                    <View className='w-full flex-row items-center justify-start gap-2'>
                        <TouchableOpacity className='w-5 h-5 items-center justify-start' style={{ backgroundColor: deleteAllSessionOpt ? Colors.Primary : "#fff" }} activeOpacity={0.8} onPress={() => setDeleteAllSessionOpt(!deleteAllSessionOpt)}>
                            {deleteAllSessionOpt && <Text className='text-white '>✔</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setDeleteAllSessionOpt(!deleteAllSessionOpt)} activeOpacity={0.8}>
                            <Text className='text-white text-base'>Đăng xuất khỏi các thiết bị khác</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView >

        </>
    )
}

export default ModifiedPassword