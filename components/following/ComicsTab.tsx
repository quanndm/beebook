import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Comic } from '@/types'
import { useUserStore } from '@/store'
import { Appwrite } from '@/configs'
import { CustomIcon } from '../common'
import { router } from 'expo-router'
import { MaterialIndicator } from 'react-native-indicators'
import { Colors } from '@/constants'

const ComicsTab = () => {
    const { user } = useUserStore()
    const [isLoading, setIsLoading] = useState(false)
    const [comics, setComics] = useState<Comic[] | undefined>([])
    const [submitLoading, setSubmitLoading] = useState(false)
    const loadBookmarkComic = async () => {
        if (!user) {
            return
        }
        setIsLoading(true)
        try {
            const res = await Appwrite.comic.getBookmark(user)
            if (res) {
                setComics(res.comics)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const removeBookmark = async (comicId: string) => {
        if (!user) {
            return
        }
        try {
            setIsLoading(true)
            setSubmitLoading(true)
            await Appwrite.comic.removeBookmark(comicId, user);
            setComics(comics?.filter((comic) => comic.$id !== comicId))
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
            setSubmitLoading(false)
        }
    }

    useLayoutEffect(() => {
        loadBookmarkComic()
    }, [])

    if (submitLoading) {
        return (
            <View className='flex-1 justify-center items-center w-full h-full'>
                <MaterialIndicator color={Colors.Primary} />
            </View>
        )
    }

    return (
        <>
            <FlatList
                data={comics}
                keyExtractor={(item) => item.$id}
                ItemSeparatorComponent={() => <View className='w-full h-0.5 my-3' />}
                style={{ margin: 10 }}
                renderItem={({ item }) => (
                    <>
                        <TouchableOpacity onPress={() => {
                            router.push(`/comics/${item.$id}/`)
                        }} activeOpacity={0.8}>
                            <View className='flex flex-row '>
                                <View className='w-[80px] h-[100px] mr-2'>

                                    <Image
                                        source={{ uri: item.thumbnailUrl }}
                                        style={{ width: 80, height: 100, borderRadius: 5 }}
                                        resizeMode='cover'
                                    />

                                </View>
                                <View className='flex-1 flex-row'>
                                    <View className='flex-1 justify-start'>
                                        <Text className='text-white font-bold text-lg'>{item.name}</Text>
                                        <Text className='text-white text-sm'>Chapter: {item.totalChapter}</Text>
                                        <Text className='text-white text-sm'>Nhóm dịch: {item.translationTeam.name}</Text>
                                    </View>

                                    <View>
                                        <TouchableOpacity activeOpacity={0.7} disabled={isLoading} onPress={() => removeBookmark(item.$id)}>

                                            <CustomIcon name='trash' size={24} color='white' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </>
                )}
                contentContainerStyle={(comics && comics.length === 0) || !comics ? { flex: 1 } : {}}
                ListEmptyComponent={() => {
                    if (isLoading) {
                        return (
                            <View className='flex-1 justify-center items-center w-full h-full'>
                                <MaterialIndicator color={Colors.Primary} />
                            </View>
                        )
                    }

                    return (
                        <View className='flex flex-1 justify-center items-center w-full h-full '>
                            <View className='items-center gap-2'>
                                <CustomIcon name='book' size={64} color='#fff' />
                                <Text className='text-white text-lg'>
                                    Chưa theo dõi truyện nào
                                </Text>
                            </View>
                        </View>
                    )
                }}
            />
        </>
    )
}

export default ComicsTab