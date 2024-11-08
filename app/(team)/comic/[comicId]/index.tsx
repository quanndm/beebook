import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Image, RefreshControl } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Appwrite } from '@/configs'
import { Comic, ComicChapter } from '@/types'
import { Colors } from '@/constants'
import { CustomIcon } from '@/components'
import { MaterialIndicator } from 'react-native-indicators'
import { useMessageModalStore, useTeamStore } from '@/store'


const ComicDetail = () => {
    const { setinfoModal, closeModal, resetModal } = useMessageModalStore()
    const { team } = useTeamStore()
    const { comicId } = useLocalSearchParams()
    const [comic, setcComic] = useState<Comic | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [listChapter, setListChapter] = useState<ComicChapter[] | undefined>([])
    const [isDelete, setIsDelete] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const getComicDetail = async () => {
        try {
            setIsLoading(true)
            const res = await Appwrite.comic.getComic(comicId as string)
            setcComic(res)
        } catch (error) {
            throw new Error("Failed to get comic detail")
        } finally {
            setIsLoading(false)
        }
    }

    const getChapterList = async () => {
        try {
            const res = await Appwrite.chapter.getChapters(comicId as string)
            setListChapter(res)
        } catch (error) {
            console.log(error)
        }
    }

    const load = async () => {
        await Promise.all([getComicDetail(), getChapterList()])
    }

    const deleteComic = async () => {
        if (comic?.totalChapter !== 0) {
            alert("Không thể xóa truyện có chương")
            return
        }
        try {
            setSubmitLoading(true)
            await Appwrite.comic.deleteComic(comicId as string, team!, comic?.comicCategory?.$id!)
            router.replace("/(team)/comic/")
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
            setIsDelete(false)
        }
    }

    const setInfoWarningAlert = () => {
        setinfoModal({
            header: 'Thông báo',
            message: 'Bạn có chắc chắn muốn xóa truyện này không?',
            type: 'warning',
            acceptAction: {
                text: 'Đông ý',
                onPress: () => {
                    // deleteComic()
                    setIsDelete(true)
                    closeModal()
                    resetModal()
                }
            },
            cancelAction: {
                text: 'Đóng',
                onPress: () => {
                    closeModal()
                    resetModal()
                }
            }
        })
    }

    const goCreateChapter = () => {
        if (comic?.type === 'comic') {
            router.push(`/comic/${comicId}/chapter/create-comic`)
        } else {
            router.push(`/comic/${comicId}/chapter/create-novel`)
        }
    }
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await load()
        setRefreshing(false);
    }, []);

    useLayoutEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if (isDelete) {
            deleteComic()
        }
    }, [isDelete])


    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: (props) => (
                        <CustomIcon
                            name="arrow-back"
                            size={24}
                            color="#fff"
                            onPress={() => router.replace("/(team)/comic/")}
                            className='mr-2'
                        />
                    ),
                    title: isLoading ? "" : comic?.name,
                    headerStyle: { backgroundColor: Colors.Primary },
                    headerTitleStyle: { color: "#fff", fontWeight: "bold" },
                    headerRight: () => {
                        return (
                            <View className='flex-row gap-3 justify-center items-center'>
                                <TouchableOpacity onPress={goCreateChapter} >
                                    <CustomIcon name="add" size={32} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.replace(`/comic/${comicId}/edit`)} >
                                    <CustomIcon name="create-outline" size={28} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={setInfoWarningAlert} disabled={submitLoading} >
                                    {submitLoading ? (
                                        <View className='p-2'>
                                            <MaterialIndicator color="white" size={24} />
                                        </View>
                                    ) : (
                                        <CustomIcon name="trash-outline" size={26} color="#fff" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        )
                    }
                }}
            />
            <SafeAreaView
                className={`flex-1 w-full h-full `}
                style={{ backgroundColor: Colors.Secondary_1 }}
            >
                <FlatList
                    data={listChapter}
                    keyExtractor={(item) => item.$id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListHeaderComponent={() => {
                        return (
                            <View className='my-3'>
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
                                    </View>
                                </View>
                                <View>
                                    <View className='border-b border-white mx-5 mt-5' />
                                </View>
                                <View className='mx-5 mt-3 min-h-[300px]'>
                                    <Text className='text-white flex-wrap' > {comic?.description} </Text>
                                </View>
                                <View>
                                    <View className='border-b border-white mx-5 mt-5' />
                                </View>
                            </View>
                        )
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View className=' mx-5 flex-row items-center justify-between mb-2'>
                                <View className='flex-row justify-center items-center gap-1'>
                                    <Text className='text-white'>Chương {item.chapterNumber}:</Text>
                                    <Text className='text-white'>{item.name}</Text>
                                </View>
                                <View className='flex-row gap-3'>

                                    <TouchableOpacity onPress={() => router.push(`/comic/${comicId}/chapter/${item.$id}/update`)}>
                                        <CustomIcon name="create-outline" size={24} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}

                    ListEmptyComponent={() => {
                        return (
                            <View className='flex-1 justify-center items-center'>
                                {isLoading ? (
                                    <MaterialIndicator color={Colors.Primary} />

                                ) : (
                                    <Text className='text-white mt-2 mb-4'>Không có chương nào</Text>
                                )}
                            </View>
                        )
                    }}
                />
            </SafeAreaView>
        </>
    )
}

export default ComicDetail