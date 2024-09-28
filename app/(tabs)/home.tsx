import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Images, Comics as fakeDataComic } from '@/constants'
import { ComicCard, ComicRanking, CustomIcon, WideImageCarousel } from '@/components'

const Home = () => {

    return (
        <SafeAreaView
            className={`flex-1 w-full h-full`}
            style={{ backgroundColor: Colors.Secondary_1 }}
        >
            <ScrollView className='flex-1 w-full h-full'>
                {/* carousel */}
                <View className='p-4 rounded-b-3xl' style={{ backgroundColor: Colors.Secondary }}>
                    <WideImageCarousel />

                    <View className='mt-3 flex justify-around items-center flex-row'>
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
                <View className='flex-1 w-full  py-4'>
                    <View className='flex justify-between flex-row items-center px-4'>
                        <Text className='text-white font-semibold text-lg'>Phân loại</Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <CustomIcon name='arrow-forward-outline' color={Colors.Primary} suppressHighlighting size={25} />
                        </TouchableOpacity>
                    </View>

                    <View className='flex flex-row justify-between items-center h-28 px-4 gap-1 -mb-5'>
                        <TouchableOpacity className='w-1/2 h-28 ' activeOpacity={0.7}>
                            <View className='w-full h-28 flex-row flex-wrap'>
                                <Image source={Images.category_ngontinh}
                                    className='w-full h-full'
                                    resizeMode='contain'
                                    style={{ transform: [{ scaleY: 0.965 }] }}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='w-1/2 h-28 ' activeOpacity={0.7}>
                            <View className='w-full h-28 flex-row flex-wrap '>

                                <Image
                                    source={Images.category_xuyenkhong}
                                    className='w-full h-full'
                                    resizeMode='contain'
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className='flex flex-row justify-between items-center h-28 px-4 gap-1 -mb-5'>
                        <TouchableOpacity className='w-1/2 h-28 ' activeOpacity={0.7}>
                            <View className='w-full h-28 flex-row flex-wrap'>
                                <Image source={Images.category_huyenhuyen}
                                    className='w-full h-full'
                                    resizeMode='contain'
                                // style={{ transform: [{ scale: 0.976 }] }}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='w-1/2 h-28 ' activeOpacity={0.7}>
                            <View className='w-full h-28 flex-row flex-wrap '>

                                <Image
                                    source={Images.category_kinhdi}
                                    className='w-full h-full'
                                    resizeMode='contain'
                                // style={{ transform: [{ scale: 0.976 }] }}

                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className='flex flex-row justify-between items-center h-28 px-4 gap-1'>
                        <TouchableOpacity className='w-1/2 h-28 ' activeOpacity={0.7}>
                            <View className='w-full h-28 flex-row flex-wrap'>
                                <Image source={Images.category_lgbt}
                                    className='w-full h-full'
                                    resizeMode='contain'
                                // style={{ transform: [{ scale: 0.976 }] }}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='w-1/2 h-28 ' activeOpacity={0.7}>
                            <View className='w-full h-28 flex-row flex-wrap '>

                                <Image
                                    source={Images.category_hethong}
                                    className='w-full h-full'
                                    resizeMode='contain'
                                // style={{ transform: [{ scale: 0.976 }] }}

                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* New update */}
                <View className='mb-4'>
                    <View className='flex justify-between flex-row items-center px-4 mb-4'>
                        <Text className='text-white font-semibold text-lg'>Mới cập nhật </Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <CustomIcon name='arrow-forward-outline' color={Colors.Primary} suppressHighlighting size={25} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <FlatList
                            data={fakeDataComic}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <ComicCard
                                        id={item.id}
                                        image={item.image}
                                        title={item.title}
                                        chapter={item.chapter}
                                    />
                                )
                            }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className='px-4'
                        />
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
                        <FlatList
                            data={fakeDataComic}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <ComicCard
                                        id={item.id}
                                        image={item.image}
                                        title={item.title}
                                        chapter={item.chapter}
                                    />
                                )
                            }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className='px-4'
                        />
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
                        <FlatList
                            data={fakeDataComic}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <ComicCard
                                        id={item.id}
                                        image={item.image}
                                        title={item.title}
                                        chapter={item.chapter}
                                    />
                                )
                            }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className='px-4'
                        />
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
                            <FlatList
                                data={fakeDataComic}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <ComicCard
                                            id={item.id}
                                            image={item.image}
                                            title={item.title}
                                            chapter={item.chapter}
                                        />
                                    )
                                }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                className='px-4'
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home