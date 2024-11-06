import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { MaterialIndicator } from 'react-native-indicators'
import { Colors } from '@/constants'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { CustomIcon, CustomInput } from '@/components'
import { ChapterContent, ComicChapter } from '@/types'
import { Appwrite } from '@/configs'

const UpdateChapter = () => {
    const { comicId, chapterId } = useLocalSearchParams()
    const [comicChapter, setComicChapter] = useState<ComicChapter | undefined>(undefined)
    const [chapterContent, setChapterContent] = useState<ChapterContent | undefined>(undefined)
    const [name, setName] = useState("")
    const [content, setContent] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const loadComicChapter = async () => {
        try {
            const res = await Appwrite.chapter.getChapter(chapterId as string)
            if (res) {
                setComicChapter(res)
                setName(res.name)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const loadChapterContent = async () => {
        try {
            const res = await Appwrite.chapter.getChapterContent(chapterId as string)
            if (res) {
                setChapterContent(res)
                setContent(res.content)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const load = async () => {
        await Promise.all([loadComicChapter(), loadChapterContent()])
    }

    const submit = async () => {
        try {
            setIsLoading(true)
            await Appwrite.chapter.updateChapterNovel({ ...comicChapter, name }, { ...chapterContent, content })
            router.back()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useLayoutEffect(() => {
        load()
    }, [])

    return (
        <>

            <Stack.Screen
                options={{
                    headerLeft: (props) => (
                        <CustomIcon
                            name="arrow-back"
                            size={24}
                            color="#fff"
                            onPress={() => router.back()}
                            className='mr-2'
                        />
                    ),
                    title: "Cập nhật chương",
                    headerStyle: { backgroundColor: Colors.Secondary },
                    headerTitleStyle: { color: "#fff", fontWeight: "bold" },
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={submit} disabled={isLoading} className='py-1.5 px-4 bg-primary items-center justify-start rounded-md flex-row' activeOpacity={0.8}>
                                {isLoading && (
                                    <View className='mr-2'>
                                        <MaterialIndicator size={18} color="#fff" />
                                    </View>
                                )}
                                <Text className='text-white text-base font-semibold'>
                                    Lưu
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                }}
            />


            < SafeAreaView className='w-full h-full flex-1 p-4  grow' style={{ backgroundColor: Colors.Secondary_1 }}>
                <View className='mt-8 px-4 rounded-2xl ' style={{ backgroundColor: Colors.Secondary_2 }}>
                    <View className='my-3'>
                        <Text className='text-white text-base'>
                            Tên chương
                        </Text>
                        <CustomInput
                            placeholder='Nhập tên chương'
                            value={name}
                            onChangeText={(text) => setName(text)}
                            heightInput={50}
                        />
                    </View>

                    <View className='my-3'>
                        <Text className='text-white text-base'>
                            Số chương hiện tại
                        </Text>
                        <CustomInput
                            value={comicChapter?.chapterNumber?.toString() || ''}
                            heightInput={50}
                            keyboardType='number-pad'
                            editable={false}
                        />
                    </View>

                    <View className='my-3'>
                        <Text className='text-white text-base'>
                            Nội dung
                        </Text>
                        <CustomInput
                            value={content}
                            onChangeText={(text) => setContent(text)}
                            heightInput={200}
                            multiline
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

export default UpdateChapter