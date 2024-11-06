import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { CustomIcon, CustomInput } from '@/components'
import { Colors } from '@/constants'
import { MaterialIndicator } from 'react-native-indicators'
import { Appwrite } from '@/configs'
import { ChapterContent, Comic, ComicChapter, ComicType } from '@/types'

const CreateNovelChapter = () => {
    const { comicId } = useLocalSearchParams()
    const [isSubmit, setIsSubmit] = useState(false)
    const [comic, setComic] = useState<Comic | undefined>(undefined)

    const [form, setForm] = useState({
        name: '',
        chapterNumber: 0,
        type: "novel" as ComicType,
        content: ''
    })

    const loadComicDetail = async () => {
        try {
            const res = await Appwrite.comic.getComic(comicId as string)
            if (res) {
                setComic(res)
                setForm({ ...form, type: res.type, chapterNumber: res.totalChapter + 1 })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const submit = async () => {
        if (form.content === '' || form.name === '') {
            alert("Vui lòng điền đầy đủ thông tin")
            return
        }

        try {
            setIsSubmit(true)
            const chapterComic: Omit<Partial<ComicChapter>, "$id"> = {
                chapterNumber: form.chapterNumber,
                type: form.type,
                comicId: comicId as string,
                name: form.name,
            }

            const chapterContent: Omit<Partial<ChapterContent>, "$id"> = {
                content: form.content,
                chapterNumber: form.chapterNumber,
                comicId: comicId as string,
            }

            await Appwrite.chapter.createChapterNovel(chapterComic, chapterContent, comic!)

            router.replace(`/app/(team)/comic/${comicId}`)
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmit(false)
        }
    }

    useLayoutEffect(() => {
        loadComicDetail()
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
                    title: "Thêm chương mới",
                    headerStyle: { backgroundColor: Colors.Secondary },
                    headerTitleStyle: { color: "#fff", fontWeight: "bold" },
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={submit} disabled={isSubmit} className='py-1.5 px-4 bg-primary items-center justify-start rounded-md flex-row' activeOpacity={0.8}>
                                {isSubmit && (
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
                            value={form.name}
                            onChangeText={(text) => setForm({ ...form, name: text })}
                            heightInput={50}
                        />
                    </View>

                    <View className='my-3'>
                        <Text className='text-white text-base'>
                            Số chương hiện tại
                        </Text>
                        <CustomInput
                            value={form.chapterNumber.toString()}
                            onChangeText={(text) => setForm({ ...form, chapterNumber: parseInt(text) })}
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
                            value={form.content}
                            onChangeText={(text) => setForm({ ...form, content: text })}
                            heightInput={200}
                            multiline
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

export default CreateNovelChapter