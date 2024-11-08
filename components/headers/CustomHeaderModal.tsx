import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CustomIcon } from '../common/CustomIcon'
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import CustomInput from '../form/CustomInput';
import { Colors } from '@/constants';
import { useSearchStore } from '@/store';

const CustomHeaderModal = (props: NativeStackHeaderProps) => {
    const { setQuery, reset } = useSearchStore()
    const [search, setSearch] = useState("")
    const { navigation } = props


    return (
        <View className='flex flex-row justify-start items-center w-full h-[70px] px-5  py-4' style={{ backgroundColor: Colors.Secondary }}>
            <TouchableOpacity onPress={() => {
                reset()
                navigation.goBack()
            }}>
                <CustomIcon name='arrow-back' color={"white"} />
            </TouchableOpacity>

            <View className='w-full px-4'>
                <CustomInput
                    placeholder='Search'
                    keyboardType='default'
                    isSearch
                    value={search}
                    onChangeText={setSearch}
                    customContainerStyleClassName=' mt-0 mb-0 space-y-0'
                    heightInput={45}
                    callbackSearch={() => {
                        setQuery(search)
                    }}
                />
            </View>
        </View>
    )
}

export default CustomHeaderModal