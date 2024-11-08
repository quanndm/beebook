import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { CustomIcon } from '../common'
import { Colors, Images } from '@/constants'
import { router } from 'expo-router'

const Categories = () => {
    const handlePress = () => {
        router.push("/comics/discover")
    }
    return (
        <View className='flex-1 w-full  py-4'>
            <View className='flex justify-between flex-row items-center px-4'>
                <Text className='text-white font-semibold text-lg'>Phân loại</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
                    <CustomIcon name='arrow-forward-outline' color={Colors.Primary} suppressHighlighting size={25} />
                </TouchableOpacity>
            </View>

            <View className='flex flex-row justify-between items-center h-28 px-4 gap-1 -mb-5'>
                <TouchableOpacity className='w-1/2 h-28 ' activeOpacity={0.7} onPress={handlePress}>
                    <View className='w-full h-28 flex-row flex-wrap'>
                        <Image source={Images.category_ngontinh}
                            className='w-full h-full'
                            resizeMode='contain'
                            style={{ transform: [{ scaleY: 0.965 }] }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className='w-1/2 h-28 ' activeOpacity={0.7} onPress={handlePress}>
                    <View className='w-full h-28 flex-row flex-wrap '>

                        <Image
                            source={Images.category_xuyenkhong}
                            className='w-full h-full'
                            resizeMode='contain'
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View className='flex flex-row justify-between items-center h-28 px-4 gap-1 -mb-5'>
                <TouchableOpacity className='w-1/2 h-28 ' activeOpacity={0.7} onPress={handlePress}>
                    <View className='w-full h-28 flex-row flex-wrap'>
                        <Image source={Images.category_huyenhuyen}
                            className='w-full h-full'
                            resizeMode='contain'
                        // style={{ transform: [{ scale: 0.976 }] }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className='w-1/2 h-28 ' activeOpacity={0.7} onPress={handlePress}>
                    <View className='w-full h-28 flex-row flex-wrap '>

                        <Image
                            source={Images.category_hethong}
                            className='w-full h-full'
                            resizeMode='contain'
                        // style={{ transform: [{ scale: 0.976 }] }}

                        />
                    </View>
                </TouchableOpacity>
            </View>

            {/* <View className='flex flex-row justify-between items-center h-28 px-4 gap-1'>
                <TouchableOpacity className='w-1/2 h-28 ' activeOpacity={0.7}>
                    <View className='w-full h-28 flex-row flex-wrap'>
                        <Image source={Images.category_lgbt}
                            className='w-full h-full'
                            resizeMode='contain'
                        // style={{ transform: [{ scale: 0.976 }] }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className='w-1/2 h-28 ' activeOpacity={0.7}>
                    <View className='w-full h-28 flex-row flex-wrap '>

                        <Image
                            source={Images.category_hethong}
                            className='w-full h-full'
                            resizeMode='contain'
                        // style={{ transform: [{ scale: 0.976 }] }}

                        />
                    </View>
                </TouchableOpacity>
            </View> */}

        </View>
    )
}

export default Categories