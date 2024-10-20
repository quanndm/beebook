import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Stack } from 'expo-router'
import { CustomIcon, ModalCategory } from '@/components'
import { Colors } from '@/constants'
import { ComicCategory } from '@/types'
import { Appwrite } from '@/configs'
import { MaterialIndicator } from 'react-native-indicators'

const CategoryManagement = () => {

    const [listCategories, setListCategories] = useState<ComicCategory[] | undefined>([])
    const [isLoading, setIsLoading] = useState(false)
    const [openModelAdd, setOpenModelAdd] = useState(false)
    const [openModelEdit, setOpenModelEdit] = useState(false)
    const [selectEdit, setSelectEdit] = useState<ComicCategory | undefined>(undefined)
    const loadCategories = async () => {
        setIsLoading(true)
        try {
            // call api get list categories
            const categories = await Appwrite.comic.getComicCategories();
            setListCategories(categories)
        } catch (error) {
            console.error("Failed to load categories:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteCategory = async (id: string) => {
        setIsLoading(true)
        try {
            await Appwrite.comic.deleteComicCategory(id)
            await loadCategories()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useLayoutEffect(() => {
        loadCategories()
    }, [])

    useEffect(() => {
        if (selectEdit) {
            setOpenModelEdit(true)
        }
    }, [selectEdit])


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
                    title: "Quản lý thể loại",
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setOpenModelAdd(true)
                                }}
                                activeOpacity={0.8}
                            >
                                <CustomIcon name='add' size={24} color='#fff' />
                            </TouchableOpacity>
                        )
                    }
                }}
            />
            < SafeAreaView className='w-full h-full flex-1 p-4' style={{ backgroundColor: Colors.Secondary_1 }}>

                {isLoading ? (
                    <View className='flex justify-center items-center w-full h-full'>
                        <MaterialIndicator color="#fff" />
                    </View>
                ) :
                    <FlatList
                        data={listCategories}
                        keyExtractor={item => item.$id.toString()}
                        ItemSeparatorComponent={() => {
                            return (
                                <View className='w-full h-0.5' style={{ backgroundColor: Colors.Secondary_2 }} />
                            )
                        }}
                        renderItem={({ item }) => (
                            <>
                                <View className='flex-row my-2 justify-between'>
                                    <Text className='text-white text-lg font-semibold'>
                                        {item.name} ({item.totalComic})
                                    </Text>
                                    <View className='flex-row gap-2'>
                                        <TouchableOpacity activeOpacity={0.8}>
                                            <CustomIcon name='create-outline' size={24} color='#fff' onPress={() => {
                                                setSelectEdit(item)
                                            }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteCategory(item.$id)} activeOpacity={0.8}>
                                            {isLoading ? (
                                                <View>
                                                    <MaterialIndicator color="#fff" />
                                                </View>
                                            ) : (<CustomIcon name='trash' size={24} color='#fff' />)}

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        )}
                    />
                }

                <ModalCategory visible={openModelAdd} setVisible={setOpenModelAdd} loadCategories={loadCategories} />
                <ModalCategory
                    visible={openModelEdit}
                    setVisible={setOpenModelEdit}
                    loadCategories={loadCategories}
                    isEdit={true} itemEdit={selectEdit}
                    setitemEdit={setSelectEdit} />
            </SafeAreaView>
        </>
    )
}

export default CategoryManagement