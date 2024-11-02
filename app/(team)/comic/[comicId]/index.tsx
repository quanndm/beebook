import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Appwrite } from '@/configs'
import { Comic } from '@/types'
import { Colors } from '@/constants'
import { CustomIcon } from '@/components'
import { MaterialIndicator } from 'react-native-indicators'
import { useMessageModalStore, useTeamStore } from '@/store'

// #TODO: design comic detail screen
const ComicDetail = () => {
    const { setinfoModal, closeModal, resetModal } = useMessageModalStore()
    const { team } = useTeamStore()
    const { comicId } = useLocalSearchParams()
    const [comic, setcComic] = useState<Comic | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [listChapter, setListChapter] = useState([] as any)
    const [isDelete, setIsDelete] = useState(false)
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
    useLayoutEffect(() => {
        getComicDetail()
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
                                <TouchableOpacity onPress={() => router.replace(`/comic/${comicId}/edit`)} >
                                    <CustomIcon name="create-outline" size={26} color="#fff" />
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
                                <View className='mx-5 mt-3'>
                                    <Text className='text-white'> {comic?.description} </Text>
                                </View>
                            </View>
                        )
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View className='bg-white p-4 flex-row items-center justify-between'>
                                <Text>Item</Text>
                            </View>
                        )
                    }}
                />
            </SafeAreaView>
        </>
    )
}

export default ComicDetail