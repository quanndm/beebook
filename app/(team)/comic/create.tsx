import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants'
import { CustomIcon, CustomInput } from '@/components'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Appwrite } from '@/configs'
import { ComicCategory, ComicType, FormCreateComic } from '@/types'
import { MaterialIndicator } from 'react-native-indicators'
import { useTeamStore } from '@/store'

const CreateComic = () => {
    const [listCategories, setListCategories] = useState<ComicCategory[] | undefined>([])
    const { team } = useTeamStore()
    const [isLoading, setIsLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        description: "",
        categoryId: "",
        type: "novel" as ComicType
    })
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            const asset = result.assets[0]
            if (asset.fileSize! > 50 * 1024 * 1024) {
                alert("File size exceeds 50 MB. Please choose a smaller file.");
                return;
            }
            setImage(result.assets[0]);
        }
    };


    const submit = async () => {
        if (!form.name) {
            alert("Tên truyện không được để trống");
            return;
        }
        if (!form.description) {
            alert("Mô tả không được để trống");
            return;
        }
        if (!image) {
            alert("Ảnh truyện không được để trống");
            return;
        }
        const category = listCategories?.find((category) => category.$id === form.categoryId);
        if (!category || !team) {
            alert("Team hoặc thể loại không hợp lệ");
            return;
        }
        setSubmitLoading(true)

        try {
            // call api create comic
            const formData: FormCreateComic = {
                name: form.name,
                description: form.description,
                category: category,
                translationTeam: team,
                file: image,
                type: form.type
            };

            await Appwrite.comic.createComics(formData);
            router.replace("/(team)/comic/")
        } catch (error) {
            console.error("Failed to create comic:", error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const loadCategories = async () => {
        setIsLoading(true)
        try {
            // call api get list categories
            const categories = await Appwrite.comic.getComicCategories();
            setListCategories(categories)
            setForm({ ...form, categoryId: categories![0].$id })
        } catch (error) {
            console.error("Failed to load categories:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useLayoutEffect(() => {
        loadCategories()
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
                    title: "Thêm truyện",
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={submit} disabled={submitLoading} className='py-1.5 px-4 bg-primary items-center justify-start rounded-md flex-row' activeOpacity={0.8}>
                                {submitLoading && (
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
                            Tên Truyện
                        </Text>
                        <CustomInput
                            placeholder='Nhập tên truyện'
                            value={form.name}
                            onChangeText={(text) => setForm({ ...form, name: text })}
                            heightInput={50}
                        />
                    </View>

                    <View className='mb-3'>
                        <Text className='text-white text-base mb-2'>
                            Phân loại
                        </Text>
                        <Picker
                            selectedValue={form.type}
                            style={{ color: 'white', borderBlockColor: 'white', backgroundColor: '#3D3D3D', borderColor: "rgb(156,163,175)", borderWidth: 1 }}
                            dropdownIconColor={'white'}
                            onValueChange={(itemValue, itemIndex) => {
                                setForm({ ...form, type: itemValue })
                                // alert(itemValue)
                            }}>
                            <Picker.Item key={1} label="novel" value="novel" />
                            <Picker.Item key={2} label="comic" value="comic" />
                        </Picker>
                    </View>

                    <View className='my-3'>
                        <Text className='text-white text-base mb-2'>
                            Thể loại
                        </Text>

                        {isLoading ? (
                            <View className='border-gray-400 flex justify-center items-center my-7'>
                                <MaterialIndicator size={18} color="#fff" />
                            </View>
                        ) : (
                            <Picker
                                selectedValue={form.categoryId}
                                style={{ color: 'white', borderBlockColor: 'white', backgroundColor: '#3D3D3D', borderColor: "rgb(156,163,175)", borderWidth: 1 }}
                                dropdownIconColor={'white'}
                                onValueChange={(itemValue, itemIndex) => {
                                    setForm({ ...form, categoryId: itemValue })
                                    // alert(itemValue)
                                }}>
                                {
                                    listCategories?.map((category) => (
                                        <Picker.Item key={category.$id} label={category.name} value={category.$id} />
                                    ))
                                }
                            </Picker>
                        )}

                    </View>

                    <View className='mb-3'>
                        <Text className='text-white text-base'>
                            Mô tả
                        </Text>
                        <CustomInput
                            value={form.description}
                            onChangeText={(text) => setForm({ ...form, description: text })}
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    <View className='mb-4'>
                        <View className='flex-row gap-2 mb-3'>
                            <Text className='text-white text-base'>
                                Ảnh truyện
                            </Text>

                            <TouchableOpacity
                                onPress={pickImage}
                                activeOpacity={0.8}
                            >
                                <CustomIcon name='camera-outline' size={24} color={Colors.Primary} />
                            </TouchableOpacity>
                        </View>

                        <View className='w-40 h-44 flex items-center justify-center' style={{ backgroundColor: Colors.Secondary_3 }}>
                            {
                                image ? (
                                    <Image source={{ uri: image.uri }} className='w-40 h-44 ' resizeMode='cover' />
                                ) : (
                                    <TouchableOpacity onPress={pickImage}>
                                        <CustomIcon name='add-circle-outline' size={40} color={Colors.Primary} />
                                    </TouchableOpacity>
                                )
                            }


                        </View>
                    </View>
                </View>
            </SafeAreaView >
        </>
    )
}

export default CreateComic