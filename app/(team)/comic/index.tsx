import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants'
import { CustomIcon } from '@/components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Comic } from '@/types'
import { Appwrite } from '@/configs'
import { useTeamStore } from '@/store'
import { MaterialIndicator } from 'react-native-indicators'


const ComicManagement = () => {
    const { team } = useTeamStore();

    const [listComics, setListComics] = useState<Comic[] | undefined>([])
    const [isLoading, setIsLoading] = useState(false)


    const loadComics = async () => {
        setIsLoading(true)
        try {
            // call api get list comics
            const comics = await Appwrite.comic.getComics(team!);
            setListComics(comics)
        } catch (error) {
            console.error("Failed to load comics:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useLayoutEffect(() => {
        loadComics()
    }, [])


    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: Colors.Secondary },
                    headerTitleStyle: { color: "#fff" },
                    headerLeft: (props) => (
                        <CustomIcon
                            name="arrow-back"
                            size={24}
                            color="#fff"
                            onPress={() => router.replace("/(team)/")}
                            className='mr-2'
                        />
                    ),
                    title: "Quản lý truyện",
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    router.push("/(team)/comic/create")
                                }}
                                activeOpacity={0.8}
                            >
                                <CustomIcon name='add' size={24} color='#fff' />
                            </TouchableOpacity>
                        )
                    }
                }}
            />

            < SafeAreaView className='w-full h-full flex-1 p-4  grow' style={{ backgroundColor: Colors.Secondary_1 }}>
                {isLoading ? (
                    <>
                        <View className='flex justify-center items-center w-full h-full'>
                            <MaterialIndicator color="#fff" />
                        </View>
                    </>
                ) : (
                    <FlatList
                        data={listComics}
                        keyExtractor={(item) => item.$id}
                        ItemSeparatorComponent={() => <View className='w-full h-0.5 my-3' />}
                        renderItem={({ item }) => (
                            <>
                                <TouchableOpacity onPress={() => {
                                    router.push(`/(team)/comic/${item.$id}/`)
                                }} activeOpacity={0.8}>
                                    <View className='flex flex-row '>
                                        <View className='w-[80px] h-[100px] mr-2'>

                                            <Image
                                                source={{ uri: item.thumbnailUrl }}
                                                style={{ width: 80, height: 100 }}
                                                resizeMode='cover'
                                            />

                                        </View>
                                        <View className='flex-1 flex-row'>
                                            <View className='flex-1 justify-between'>

                                                <Text className='text-white'>Name: {item.name}</Text>
                                                <Text className='text-white'>Chapter: {item.totalChapter}</Text>
                                                <Text className='text-white'>Nhóm dịch: {item.translationTeam.name}</Text>
                                                <Text className='text-white'>Mô tả thêm: {item.description}</Text>
                                            </View>


                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )}
                        contentContainerStyle={(listComics && listComics.length === 0) || !listComics ? { flex: 1 } : {}}
                        ListEmptyComponent={() => {
                            return (
                                <View className='flex flex-1 justify-center items-center w-full h-full '>
                                    <View className='items-center gap-2'>
                                        <CustomIcon name='book' size={64} color='#fff' />
                                        <Text className='text-white text-lg'>
                                            Chưa có truyện nào, hãy thêm truyện mới!
                                        </Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                )}
            </SafeAreaView>
        </>
    )
}

export default ComicManagement