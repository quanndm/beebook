import { Image, Modal, Text, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, } from '@/constants'
import { router } from 'expo-router'
import { Appwrite } from '@/configs'
import { useTeamStore, useUserStore } from '@/store'
import { ModalTeam, ModalTeamJoin } from '@/components'

const Account = () => {
    const { user, reset: resetStoreUser } = useUserStore()
    const { team } = useTeamStore()
    const [visibleModal, setVisibleModal] = useState(false)
    // const [hasTranslateTeam, setHasTranslateTeam] = useState(false)
    const [visibleModalJoin, setVisibleModalJoin] = useState(false)
    // handle
    const logout = async () => {
        try {
            await Appwrite.auth.logOut()
            resetStoreUser()
            router.replace('/(auth)/login')
        } catch (error) {
            console.error(error)
        }
    }


    // #TODO: design UI for translation team
    return (
        <SafeAreaView className='h-full w-full flex-1' style={{ backgroundColor: Colors.Secondary_1 }}>
            <View className='w-100 h-[25%] bg-primary' >
            </View>
            <View className='flex-1 relative'>
                {/* avatar */}
                <View className='items-center'>
                    <View className='w-[120px] h-[120px] rounded-full bg-white -top-[60px] items-center justify-center'>
                        <Image
                            source={{ uri: user?.avatar }}
                            className='w-[110px] h-[110px] rounded-full'
                        />
                    </View>
                    <View className='items-center -top-[35px]'>
                        <Text className='text-white text-lg'>{user?.username}</Text>
                        <Text className='text-white text-sm'>
                            {user?.email}
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
                            {/* item 1 */}
                            <TouchableOpacity
                                className='flex-row items-center p-4 mb-4 rounded-2xl '
                                style={{ backgroundColor: Colors.Secondary_3 }}
                                activeOpacity={0.8}
                                onPress={() => {
                                    router.push('/(auth)/modified-password')
                                }}
                            >
                                <View className='w-full'>
                                    <Text className='text-white text-base'>Thay đổi mật khẩu</Text>
                                </View>
                            </TouchableOpacity>

                            {/* item 2 */}
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

                            {/* item 3 */}
                            {
                                !team ? (
                                    <TouchableOpacity
                                        className='flex-row items-center p-4 mb-4 rounded-2xl '
                                        style={{ backgroundColor: Colors.Secondary_3 }}
                                        activeOpacity={0.8}
                                        onPress={() => setVisibleModal(true)}
                                    >
                                        <View className='w-full'>
                                            <Text className='text-white text-base'>Đăng ký nhóm dịch truyện</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        className='flex-row items-center p-4 mb-4 rounded-2xl '
                                        style={{ backgroundColor: Colors.Secondary_3 }}
                                        activeOpacity={0.8}
                                        onPress={() => router.push('/(team)/')}
                                    >
                                        <View className='w-full'>
                                            <Text className='text-white text-base'>Quản lý nhóm</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }

                            {/* item 4 */}
                            <TouchableOpacity
                                className='flex-row items-center p-4 rounded-2xl '
                                style={{ backgroundColor: Colors.Secondary_3 }}
                                activeOpacity={0.8}
                                onPress={logout}
                            >
                                <View className='w-full'>
                                    <Text className='text-white text-base'>Đăng xuất</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <ModalTeam
                setVisible={setVisibleModal}
                visible={visibleModal}
                setVisibleModalJoin={setVisibleModalJoin}
            />
            <ModalTeamJoin
                setVisible={setVisibleModalJoin}
                visible={visibleModalJoin}
            />
        </SafeAreaView>
    )
}

export default Account
