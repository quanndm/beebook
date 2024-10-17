import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants'
import { CustomIcon, CustomInput } from '@/components'
import { MaterialIndicator } from 'react-native-indicators'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ID } from 'react-native-appwrite'
import * as ImagePicker from 'expo-image-picker';
import { FormCreateTeam, Team } from '@/types'
import { useTeamStore, useUserStore } from '@/store'
import { Appwrite } from '@/configs'

const CreateTeam = () => {
    const { user } = useUserStore();
    const {setTeam} = useTeamStore()
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        inviteCode: ID.unique()
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

    const handleCreateTeam = async () => {
        if (form.name === "" || !image) {
            alert("Vui lòng điền đầy đủ thông tin")
            return
        }

        setIsLoading(true)
        try {
            const formCreate: FormCreateTeam = {
                file: image,
                name: form.name,
                invitationCode: form.inviteCode,
                owner: user!
            }

            const res = await Appwrite.team.createTeam(formCreate);
            const team = res as unknown as Team
            // save to global store
            setTeam(team)

            router.replace('/(tabs)/account')
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: Colors.Secondary },
                    headerTitleStyle: { color: "#fff" },
                    title: 'Tạo nhóm dịch truyện',
                    headerLeft: (props) => (
                        <CustomIcon
                            name='arrow-back-outline'
                            size={26}
                            onPress={() => router.back()}
                            className='mr-4'
                            color={"white"}
                            disabled={isLoading}
                        />
                    ),
                    headerRight: (props) => {
                        return (
                            <TouchableOpacity onPress={handleCreateTeam} disabled={isLoading} className='py-1.5 px-4 bg-primary items-center justify-start rounded-md flex-row' activeOpacity={0.8}>
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

            <SafeAreaView className='w-full h-full flex-1 p-4' style={{ backgroundColor: Colors.Secondary_1 }}>
                <View className='mt-8 px-4 rounded-2xl ' style={{ backgroundColor: Colors.Secondary_2 }}>

                    <View className='my-3'>
                        <Text className='text-white text-base'>
                            Tên nhóm
                        </Text>
                        <CustomInput
                            placeholder='Nhập tên nhóm'
                            value={form.name}
                            onChangeText={(text) => setForm({ ...form, name: text })}
                            heightInput={50}
                        />
                    </View>

                    <View className='mb-3'>
                        <Text className='text-white text-base'>
                            Mã mời
                        </Text>
                        <CustomInput
                            value={form.inviteCode}
                            heightInput={50}
                            editable={false}
                        />
                    </View>

                    <View className='mb-4'>
                        <View className='flex-row gap-2 mb-3'>
                            <Text className='text-white text-base'>
                                Ảnh nhóm
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
            </SafeAreaView>
        </>
    )
}

export default CreateTeam