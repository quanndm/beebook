import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants'
import { CustomIcon, WideImageCarousel } from '@/components'

const Home = () => {
    return (
        <SafeAreaView
            className={`flex-1 w-full h-full`}
            style={{ backgroundColor: Colors.Secondary_1 }}
        >
            <ScrollView className='flex-1 w-full h-full'>
                {/* carousel */}
                <View className='p-4 rounded-b-[40px]' style={{ backgroundColor: Colors.Secondary }}>
                    <WideImageCarousel />

                    <View className='mt-6 flex justify-evenly items-center flex-row'>
                        <TouchableOpacity className='flex justify-center items-center gap-2' activeOpacity={0.7}>
                            <View className='w-9 h-9 rounded-full bg-primary justify-center items-center'>
                                <CustomIcon name='book-outline' color={"white"} suppressHighlighting size={22} />
                            </View>
                            <Text className='text-white font-semibold'>Khám phá</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex justify-center items-center gap-2' activeOpacity={0.7}>
                            <View className='w-9 h-9 rounded-full bg-green-400 justify-center items-center'>
                                <CustomIcon name='podium' color={"white"} suppressHighlighting size={22} />
                            </View>
                            <Text className='text-white font-semibold'>Bảng xếp hạng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex justify-center items-center gap-2' activeOpacity={0.7}>
                            <View className='w-9 h-9 rounded-full bg-blue-300 justify-center items-center'>

                                <CustomIcon name='ribbon-outline' color={"white"} suppressHighlighting size={22} />
                            </View>
                            <Text className='text-white font-semibold'>Thành tựu</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <View className='flex-1 w-full p-4 '>
                    <View className='flex justify-between flex-row items-center '>
                        <Text className='text-white font-semibold text-lg'>Phân loại</Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <CustomIcon name='arrow-forward-outline' color={Colors.Primary} suppressHighlighting size={25} />
                        </TouchableOpacity>
                    </View>

                </View>

                {/* New update */}
                <View></View>

                {/* ranking comics */}
                <View></View>

                {/* New Comic */}
                <View></View>

                {/* some hot categories */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home