import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Colors } from '@/constants';
import { CustomIcon } from '../common';

type CustomHeaderDiscoverProps = {
    openOptionModal: () => void
} & NativeStackHeaderProps

const CustomHeaderDiscover = (props: CustomHeaderDiscoverProps) => {

    const { navigation, openOptionModal } = props

    return (
        <View className='flex min-h-[80px] w-full ' style={{ backgroundColor: Colors.Secondary }}>
            <View className='flex flex-row justify-between items-center w-full h-[70px] px-5 py-4'>
                <View className='flex-row justify-center items-center gap-2'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <CustomIcon name='arrow-back' color={"white"} />
                    </TouchableOpacity>
                    <Text className='text-white text-lg font-bold '>Khám Phá</Text>
                </View>

                <TouchableOpacity onPress={openOptionModal}>
                    <CustomIcon name='options-outline' color={"white"} />
                </TouchableOpacity>
            </View>

            <View className='px-5 pb-4'>
                <Text className='text-gray-300  font-bold'>Thể loại: </Text>
            </View>
        </View>
    )
}

export default CustomHeaderDiscover