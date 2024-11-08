import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { ComicChapter } from '@/types'
import { Colors } from '@/constants'
import { MaterialIndicator } from 'react-native-indicators'
import moment from 'moment';
import { router } from 'expo-router'


type Props = {
    chapters: ComicChapter[],
    isLoading: boolean
}

const TabChapter = (props: Props) => {

    const { chapters, isLoading } = props

    const goReadChapter = (comicId: string, chapterId: string) => {
        router.push(`/comics/${comicId}/read/${chapterId}`)
    }


    if (isLoading) {
        return (
            <View className='flex-1 justify-center items-center w-full h-full'>
                <MaterialIndicator color={Colors.Primary} />
            </View>
        )
    }

    return (
        <FlatList
            data={chapters}
            ItemSeparatorComponent={() => <View className='border-b border-white' />}
            renderItem={({ item }) => (
                <TouchableOpacity className='m-2' onPress={() => goReadChapter(item.comicId, item.$id)}>
                    <View className='flex-row items-center '>
                        <Text className='text-white font-semibold'>Chương {item.chapterNumber} - </Text>
                        <Text className='text-white font-semibold'>{item.name}</Text>
                    </View>
                    <View className='flex-row items-center mt-2'>
                        <Text className='text-gray-400 text-sm'>{moment(item.$createdAt).fromNow()}</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.name}
        />
    )
}

export default TabChapter