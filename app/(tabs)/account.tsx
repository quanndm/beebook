import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Images } from '@/constants'
import { router } from 'expo-router'

const Account = () => {
    return (
        <SafeAreaView className='h-full w-full flex-1' style={{ backgroundColor: Colors.Secondary_1 }}>
            <View className='w-100 h-[25%] bg-primary' >
            </View>
            <View className='flex-1 relative'>
                {/* avatar */}
                <View className='items-center'>
                    <View className='w-[120px] h-[120px] rounded-full bg-white -top-[60px] items-center justify-center'>
                        <Image
                            source={{uri: "https://avatar.iran.liara.run/public/boy"}}
                            className='w-[110px] h-[110px] rounded-full'
                        />
                    </View>
                    <View className='items-center -top-[35px]'>
                        <Text className='text-white text-lg'>Nguyễn Văn A</Text>
                        <Text className='text-white text-sm'>
                            email@email.com
                        </Text>
                    </View>
                </View>

                {/* Content */}
                <View className=' flex-1 px-4'>
                    <View className='w-full  rounded-2xl relative'>
                        {/* overlay layer */}
                        <View
                            className='absolute w-full h-full  rounded-2xl opacity-90'
                            style={{ backgroundColor: Colors.Secondary_2 }}
                        ></View>

                        {/* link */}
                        <View className='p-4'>
                            <TouchableOpacity
                                className='flex-row items-center p-4 mb-4 rounded-2xl '
                                style={{ backgroundColor: Colors.Secondary_3 }}
                                activeOpacity={0.8}
                                onPress={() => {
                                    router.push('/(auth)/account-setting')
                                }}
                            >
                                <View className='w-full'>
                                    <Text className='text-white text-base'>Cài đặt tài khoản</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className='flex-row items-center p-4 mb-4 rounded-2xl '
                                style={{ backgroundColor: Colors.Secondary_3 }}
                                activeOpacity={0.8}
                                onPress={() => {
                                    router.push('/(auth)/modified-avatar')
                                }}
                            >
                                <View className='w-full'>
                                    <Text className='text-white text-base'>Thay đổi ảnh đại diện</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className='flex-row items-center p-4 rounded-2xl '
                                style={{ backgroundColor: Colors.Secondary_3 }}
                                activeOpacity={0.8}
                                onPress={() => {
                                    router.push('/(auth)/login')
                                }}
                            >
                                <View className='w-full'>
                                    <Text className='text-white text-base'>Đăng xuất</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Account