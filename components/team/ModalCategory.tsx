import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appwrite } from '@/configs'
import { ComicCategory } from '@/types'
import { CustomIcon } from '../common'
import { Colors } from '@/constants'
import { MaterialIndicator } from 'react-native-indicators'

type ModalCategoryProps = {
    visible: boolean,
    setVisible: (visible: boolean) => void,
    loadCategories: () => Promise<void>,
    isEdit?: boolean,
    itemEdit?: ComicCategory
    setitemEdit?: (category: ComicCategory | undefined) => void
}

const ModalCategory = (props: ModalCategoryProps) => {
    const { setVisible, visible, loadCategories, isEdit, itemEdit, setitemEdit } = props
    const [category, setCategory] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const addCategory = async () => {
        if (!category) return

        setIsLoading(true)
        try {
            const res = await Appwrite.comic.createComicCategory(category.trim())
            if (!res) {
                throw new Error('Create category failed')
            }
            setCategory("")
            await loadCategories()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
            setVisible(false)
        }
    }

    const editCategory = async () => {
        if (!category) return

        setIsLoading(true)
        try {
            const res = await Appwrite.comic.updateNameComicCategory(itemEdit?.$id!, category.trim())
            if (!res) {
                throw new Error('Update category failed')
            }
            await loadCategories()
            setitemEdit!(undefined)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
            setVisible(false)
        }
    }

    useEffect(() => {
        if (isEdit) {
            setCategory(itemEdit?.name!)
        }
    }, [itemEdit])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                alert('Modal has been closed.');
                setVisible(!visible);
            }}>
            <View className='flex-1 justify-center items-center mt-6 w-full '>
                <View className='m-5 rounded-xl p-3 items-center w-3/4' style={{ backgroundColor: Colors.Secondary }}>
                    <View className='w-full flex-row justify-end'>
                        <TouchableOpacity onPress={() => {
                            setVisible(!visible)
                            setitemEdit?.(undefined)
                        }} >
                            <CustomIcon name="close" size={26} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className='w-full'>
                        <TextInput
                            className=' p-2 my-3 rounded-lg w-full text-white'
                            style={{ backgroundColor: Colors.Secondary_3 }}
                            placeholderTextColor={"#fff"}
                            placeholder='Nhập thể loại truyện'
                            onChangeText={setCategory}
                            value={category}
                        />
                        <View className='flex items-center'>
                            <TouchableOpacity disabled={isLoading} className='mb-3 w-1/2 p-3 rounded-lg' style={{ backgroundColor: Colors.Primary }} onPress={() => {
                                isEdit ? editCategory() : addCategory()
                            }} >
                                <View className='flex-row items-center justify-center'>
                                    {isLoading && (
                                        <View className='mr-2'>
                                            <MaterialIndicator size={18} color="#fff" />
                                        </View>
                                    )}
                                    <Text className='text-white font-bold text-center'>Xác nhận</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalCategory