import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { CustomIcon } from '@/components'
import { Colors } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMessageModalStore, useTeamStore } from '@/store'
import * as Clipboard from 'expo-clipboard';

const TeamManagement = () => {

    const { setinfoModal, closeModal, resetModal } = useMessageModalStore()

    const { team } = useTeamStore()
    return (
        <>
            <SafeAreaView className='w-full h-full flex-1' style={{ backgroundColor: Colors.Secondary_1 }}>
                <ScrollView className='w-full h-full flex-1 p-4'>
                    {/* welcome */}
                    <View className='w-full flex-row justify-start items-center gap-5 mt-2'>
                        <View className='w-14 h-14 rounded-full'>
                            <Image
                                source={{ uri: team?.avatar }}
                                className='w-14 h-14 rounded-full'
                                resizeMode='cover'
                            />
                        </View>

                        <View>
                            <Text className='text-white text-md font-semibold'>
                                Xin chào,
                            </Text>
                            <Text className='text-white text-base font-semibold'>
                                {team?.name}
                            </Text>
                        </View>
                    </View>

                    {/* services */}
                    <View className='my-6'>
                        <Text className='text-white text-lg'>
                            Chức năng chính
                        </Text>
                    </View>

                    <View className='px-4 rounded-2xl ' style={{ backgroundColor: Colors.Secondary_2 }}>
                        {/* row 1 */}
                        <View className='m-4 flex justify-between items-center flex-row'>
                            <TouchableOpacity className='flex justify-center items-center gap-2 w-[30%]' activeOpacity={0.7} onPress={() => {
                                router.push('/(team)/info')
                            }}>
                                <View className='w-12 h-12 rounded-md bg-blue-300 justify-center items-center'>
                                    <CustomIcon name='information-circle-outline' color={"white"} suppressHighlighting size={22} />
                                </View>
                                <Text className='text-white font-semibold'>Thông tin nhóm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className='flex justify-center items-center gap-2 w-[30%]'
                                activeOpacity={0.7}
                                onPress={() => {
                                    router.push('/(team)/category')
                                }}
                            >
                                <View className='w-12 h-12 rounded-md bg-green-400 justify-center items-center'>
                                    <CustomIcon name='grid' color={"white"} suppressHighlighting size={22} />
                                </View>
                                <Text className='text-white font-semibold'>Danh mục</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='flex justify-center items-center gap-2 w-[30%]' activeOpacity={0.7} onPress={() => {
                                router.push('/(team)/comic')
                            }}>
                                <View className='w-12 h-12 rounded-md bg-primary justify-center items-center'>

                                    <CustomIcon name='book' color={"white"} suppressHighlighting size={22} />
                                </View>
                                <Text className='text-white font-semibold'>Comic</Text>
                            </TouchableOpacity>
                        </View>

                        {/* row 2 */}
                        <View className='m-4 flex justify-between items-center flex-row'>
                            <TouchableOpacity className='flex justify-center items-center gap-2 w-[30%]' activeOpacity={0.7} onPress={() => {
                                router.push('/(team)/member')
                            }}>
                                <View className='w-12 h-12 rounded-md bg-primary justify-center items-center'>
                                    <CustomIcon name='people' color={"white"} suppressHighlighting size={22} />
                                </View>
                                <Text className='text-white font-semibold'>Thành viên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='flex justify-center items-center gap-2 w-[30%]' activeOpacity={0.7} onPress={() => {
                                router.push('/(team)/post')
                            }}>
                                <View className='w-12 h-12 rounded-md bg-green-400 justify-center items-center'>
                                    <CustomIcon name='document-text' color={"white"} suppressHighlighting size={22} />
                                </View>
                                <Text className='text-white font-semibold'>Bài đăng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='flex justify-center items-center gap-2 w-[30%]' activeOpacity={0.7} onPress={() => router.replace("/(tabs)/account")}>
                                <View className='w-12 h-12 rounded-md bg-blue-300 justify-center items-center'>

                                    <CustomIcon name='arrow-back' color={"white"} suppressHighlighting size={22} />
                                </View>
                                <Text className='text-white font-semibold'>Quay về</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* invitation code */}
                    <View className='my-6'>
                        <Text className='text-white text-lg'>
                            Mã mời
                        </Text>
                    </View>

                    <View className='flex-row  justify-between items-center border border-yellow-200 p-4 rounded-lg'>
                        <Text className='text-white text-base'>{team?.invitationCode}</Text>
                        <TouchableOpacity onPress={async () => {
                            await Clipboard.setStringAsync(team?.invitationCode || "");
                            setinfoModal({
                                header: 'Thông báo',
                                message: 'Đã copy vào clipboard',
                                type: 'info',
                                acceptAction: {
                                    text: 'Đồng ý',
                                    onPress: () => {
                                        closeModal()
                                        resetModal()
                                    }
                                }
                            })
                        }}>
                            <CustomIcon name='copy-outline' color={"white"} suppressHighlighting size={24} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView >
        </>
    )
}

export default TeamManagement