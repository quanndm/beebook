import { View, Text, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { ChapterContent } from '@/types'
import { Appwrite } from '@/configs'
import { MaterialIndicator } from 'react-native-indicators'
import { Colors } from '@/constants'


const ChapterComic = () => {
    const { comicId, chapterId } = useLocalSearchParams()
    const [chapterContent, setChapterContent] = useState<ChapterContent | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const loadChapterContent = async () => {
        try {
            setIsLoading(true)
            const chapterContent = await Appwrite.chapter.getChapterContent(chapterId as string)
            setChapterContent(chapterContent)

        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    useLayoutEffect(() => {
        loadChapterContent()
    }, [])


    return (
        <>
            <Stack.Screen
                options={{
                    title: `Chương ${chapterContent?.chapterNumber || ''}`,
                }}
            />
            <ScrollView>
                <View className='w-full h-full flex-1 m-2'>
                    {isLoading ? (
                        <View className='flex-1 justify-center items-center w-full h-full'>
                            <MaterialIndicator color={Colors.Primary} />
                        </View>
                    ) : (
                        <>
                            <Text className='text-lg mx-2 mr-3.5'>{chapterContent?.content}</Text>
                        </>
                    )}
                </View>
            </ScrollView>
        </>
    )
}

export default ChapterComic