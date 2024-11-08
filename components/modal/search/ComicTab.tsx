import { View, Text, FlatList } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants'
import { useSearchStore } from '@/store'
import { Comic as ComicType } from '@/types'
import { Appwrite } from '@/configs'
import { MaterialIndicator } from 'react-native-indicators'
import { ComicCard } from '@/components/common'

const Comic = () => {
    // const [search, setSearch] = useState("")
    const { query } = useSearchStore()
    const [comics, setComics] = useState<ComicType[] | undefined>([])

    const [isLoading, setIsLoading] = useState(false)

    const loadComics = async (search: string) => {
        try {
            setIsLoading(true)
            const res = await Appwrite.comic.searchComic(search)
            setComics(res)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useLayoutEffect(() => {
        if (query) {
            loadComics(query)
        } else {
            setComics([])
        }

        return () => {
            setComics([])
        }
    }, [query])

    return (
        <SafeAreaView
            className={`flex-1 w-full h-full  p-3`}
            style={{ backgroundColor: Colors.Secondary_1 }}
        >
            {isLoading ? (
                <View className='mr-2'>
                    <MaterialIndicator size={20} color="#fff" />
                </View>
            ) : (
                <FlatList
                    data={comics}
                    keyExtractor={item => item.$id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <View className='w-1/2 flex justify-center items-center'>
                            <ComicCard chapter={item.totalChapter} id={item.$id} image={item.thumbnailUrl} title={item.name} />
                        </View>
                    )}
                    ListEmptyComponent={(
                        <View>
                            <Text>No comic found</Text>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    )
}

export default Comic