import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl, FlatList, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Comics as fakeDataComic } from '@/constants'
import { Categories, ComicHorizontalList, ComicRanking, CustomIcon, WideImageCarousel } from '@/components'
import { Comic } from '@/types'
import { Appwrite } from '@/configs'

const Home = () => {
    const [comics, setComics] = useState<Comic[] | undefined>([])
    const loadComics = async () => {
        try {
            const res = await Appwrite.comic.getAllComics()
            setComics(res)
        } catch (error) {
            console.log(error)
        }
    }
    const onPressBookIcon = () => {
        Alert.alert("test")
    }

    useLayoutEffect(() => {
        loadComics()
    }, [])
    return (
        <SafeAreaView
            className={`flex-1 w-full h-full`}
            style={{ backgroundColor: Colors.Secondary_1 }}
        >
            <ScrollView className='flex-1 w-full h-full'>
                {/* carousel */}
                <View className='rounded-b-3xl' style={{ backgroundColor: Colors.Secondary }}>
                    <WideImageCarousel />

                    <View className='mt-3 m-4 flex justify-around items-center flex-row'>
                        <TouchableOpacity className='flex justify-center items-center gap-2' activeOpacity={0.7} onPress={onPressBookIcon}>
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
                <Categories />

                {/* New update */}
                <View className='mb-4'>
                    <View className='flex justify-between flex-row items-center px-4 mb-4'>
                        <Text className='text-white font-semibold text-lg'>Mới cập nhật </Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <CustomIcon name='arrow-forward-outline' color={Colors.Primary} suppressHighlighting size={25} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ComicHorizontalList data={comics} />
                    </View>
                </View>

                {/* ranking comics */}
                <View className='mb-4'>
                    <View className='flex flex-row items-center px-4 mb-4 gap-2'>
                        <CustomIcon name='ribbon' color={Colors.Primary} suppressHighlighting size={25} />
                        <Text className='text-white font-semibold text-lg'>Bảng xếp hạng </Text>
                    </View>

                    {/* content */}
                    <ComicRanking />
                </View>

                {/* New Comic */}
                <View className='mb-4'>
                    <View className='flex justify-between flex-row items-center px-4 mb-4'>
                        <Text className='text-white font-semibold text-lg'>Truyện mới </Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <CustomIcon name='arrow-forward-outline' color={Colors.Primary} suppressHighlighting size={25} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ComicHorizontalList data={comics} />
                    </View>
                </View>

                {/* some hot categories */}
                <View className='mb-4'>
                    <View className='flex justify-between flex-row items-center px-4 mb-4'>
                        <Text className='text-white font-semibold text-lg'>Tu tiên - Huyền huyễn </Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <CustomIcon name='arrow-forward-outline' color={Colors.Primary} suppressHighlighting size={25} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ComicHorizontalList data={comics} />
                    </View>
                </View>

                {/*  */}
                <View className='mb-4'>
                    <View className='flex justify-between flex-row items-center px-4 mb-4'>
                        <Text className='text-white font-semibold text-lg'>Học đường </Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <CustomIcon name='arrow-forward-outline' color={Colors.Primary} suppressHighlighting size={25} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <ComicHorizontalList data={comics} />
                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default Home