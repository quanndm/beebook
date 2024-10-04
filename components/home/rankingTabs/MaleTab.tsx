import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { Colors, Images } from '@/constants'

const MaleTab = () => {
    const fakeData = [
        {
            id: 1,
            title: 'Truyện 1',
            chapper: 1,
            image: Images.temp_bg_comic_1
        },
        {
            id: 2,
            title: 'Truyện 2',
            chapper: 1,
            image: Images.temp_bg_comic_1
        },
        {
            id: 3,
            title: 'Truyện 3',
            chapper: 4,
            image: Images.temp_bg_comic_1
        },
        {
            id: 4,
            title: 'Truyện 4',
            chapper: 4,
            image: Images.temp_bg_comic_1
        },
        {
            id: 5,
            title: 'Truyện 5',
            chapper: 5,
            image: Images.temp_bg_comic_1
        }
    ]
    return (
        <View style={{ backgroundColor: Colors.Secondary }} className='rounded-b-2xl flex-1 px-3 pt-4'>
            <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={fakeData}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity className={`flex-1 flex-row ${index == fakeData.length - 1 ? "mb-4" : "mb-2"}`} activeOpacity={0.8}>
                            <View className='mr-3 mt-1 w-5 h-5 rounded-full bg-gray-500 justify-center items-center' >
                                <Text className='text-white font-semibold'>{item.id}</Text>
                            </View>
                            <View className='mr-2'>
                                <Image source={item.image} className='w-[65px] h-[100px] rounded-xl' />
                            </View>
                            <View className='flex-1'>
                                <Text className='text-white font-bold text-base' numberOfLines={1} ellipsizeMode='tail' >{item.title}</Text>
                                <Text className='text-gray-400 text-xs'>Chương {item.chapper}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default MaleTab