import { View, Image, Text, TouchableOpacity, ActivityIndicator, } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants'
import { CustomIcon } from '@/components'
import { useUserStore } from '@/store'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { Appwrite } from '@/configs'
import { User } from '@/types'

import {
    MaterialIndicator,

} from 'react-native-indicators';


const ModifiedAvatar = () => {
    const { user, setAvatar } = useUserStore()
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const [isUploading, setIsUploading] = useState(false)
    

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

    const onSaveAvatar = async () => {
        if (!image) return
        setIsUploading(true)


        try {
            // save avatar
            const result = await Appwrite.auth.updateAvatar(image!, user!)
            const { avatar, avatarId } = (result as unknown) as User

            setAvatar(avatar, avatarId!)

            // navigate back
            router.back()
        } catch (error) {
            console.error(error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: Colors.Secondary },
                    headerTitleStyle: { color: "#fff" },
                    headerLeft: (props) => (
                        <CustomIcon
                            name='arrow-back-outline'
                            size={26}
                            onPress={() => router.back()}
                            className='mr-4'
                            color={"white"}
                            disabled={isUploading}
                        />
                    ),
                    headerRight: (props) => {
                        return (
                            <TouchableOpacity onPress={onSaveAvatar} disabled={isUploading} className='py-1.5 px-4 bg-primary items-center justify-start rounded-md flex-row' activeOpacity={0.8}>
                                {isUploading && (
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
            <SafeAreaView className='w-full h-full flex-1 p-4' style={{ backgroundColor: Colors.Secondary_1 }}>
                <View className='mt-8 px-4 rounded-2xl h-[300px]' style={{ backgroundColor: Colors.Secondary_2 }}>
                    {/* avatar */}
                    <View className='w-full items-center my-10 '>
                        <View className='w-[120px] h-[120px] rounded-full bg-white  items-center justify-center'>
                            <Image
                                source={{ uri: image ? image.uri : user?.avatar }}
                                className='w-[110px] h-[110px] rounded-full'
                            />
                        </View>
                    </View>

                    {/* btn function */}
                    <View className='items-center'>
                        <TouchableOpacity onPress={pickImage}>
                            <View className='flex flex-row  justify-center gap-2'>

                                <CustomIcon name='create-outline' size={22} color={Colors.Primary} />
                                <Text className='text-white text-base'>
                                    Thay đổi ảnh dại diện
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

export default ModifiedAvatar