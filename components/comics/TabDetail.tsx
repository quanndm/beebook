import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Comic, User } from '@/types'
import { MaterialIndicator } from 'react-native-indicators'
import { Colors } from '@/constants'
import { CustomIcon } from '../common'
import { Appwrite } from '@/configs'
import { useUserStore } from '@/store'

type Props = {
    comicId: string,
    comic: Comic,
    isLoading: boolean
}

const TabDetail = (props: Props) => {
    const { comic, isLoading, comicId } = props
    const { user } = useUserStore()
    const [checkBookmarkLoading, setCheckBookmarkLoading] = useState(false)
    const [checkBookmark, setCheckBookmark] = useState(false)

    const fnCheckBookmark = async () => {
        if (!user) {
            return
        }

        try {
            setCheckBookmarkLoading(true)
            const res = await Appwrite.comic.checkBookmark(comicId, user);
            if (res) {
                setCheckBookmark(true)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setCheckBookmarkLoading(false)
        }
    }

    const handleBookmark = async () => {
        if (!user) {
            return
        }
        try {
            setCheckBookmarkLoading(true)
            if (!checkBookmark) {
                await Appwrite.comic.addBookmark(comicId, user);
                setCheckBookmark(true)
            } else {
                await Appwrite.comic.removeBookmark(comicId, user);
                setCheckBookmark(false)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setCheckBookmarkLoading(false)
        }
    }

    useLayoutEffect(() => {
        fnCheckBookmark()
    }, [])
    return (
        <ScrollView>
            <View className='my-3' >
                <View className='flex-row gap-4 mx-3'>
                    <View className='w-2/6 h-[200px] bg-white'>
                        {isLoading ? (
                            <View className='flex-1 justify-center items-center w-full h-full'>
                                <MaterialIndicator color={Colors.Primary} />
                            </View>
                        ) :
                            <>
                                <Image
                                    source={{ uri: comic?.thumbnailUrl }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </>
                        }

                    </View>

                    <View className='flex-1 '>
                        <Text className='text-xl font-bold text-white'>{comic?.name}</Text>
                        <Text className='text-sm text-gray-400 mb-2'>Đang tiến hành</Text>
                        <View className='flex-row mb-2'>
                            <Text className='text-sm text-gray-400'>Nhóm dịch: </Text>
                            <Text className='text-sm text-white'>{comic?.translationTeam.name}</Text>
                        </View>
                        <View className='flex-row mb-2'>
                            <Text className='text-sm text-gray-400'>Thể loại: </Text>
                            <Text className='text-sm text-white'>{comic?.comicCategory?.name}</Text>
                        </View>
                        <View className='flex-row mb-2'>
                            <Text className='text-sm text-gray-400'>Số chương: </Text>
                            <Text className='text-sm text-white'>{comic?.totalChapter}</Text>
                        </View>
                        <View className='flex-1 flex-row justify-end'>
                            <TouchableOpacity className='flex-row items-center bg-red-400 px-2 mt-5 rounded-lg'
                                onPress={handleBookmark}
                                disabled={checkBookmarkLoading || !user}
                            >
                                {checkBookmarkLoading ? (
                                    <View>
                                        <MaterialIndicator size={20} color={Colors.Primary} />
                                    </View>
                                ) : checkBookmark ? (
                                    <CustomIcon name='close-outline' size={20} color="white" />
                                ) : (
                                    <CustomIcon name='bookmark' size={20} color="white" />
                                )}
                                <Text className='text-white ml-2'>
                                    {checkBookmark ? "Bỏ theo dõi" : "Theo dõi"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <View className='border-b border-white mx-5 mt-5' />
                </View>

                <View className='mx-5 mt-3 min-h-[300px]'>
                    <Text className='text-white flex-wrap' > {comic?.description} </Text>
                </View>


            </View>
        </ScrollView>
    )
}

export default TabDetail