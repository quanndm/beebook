import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CustomIcon } from '../common/CustomIcon'
import { NativeStackHeaderProps } from "@react-navigation/native-stack/src/types";
import CustomInput from '../form/CustomInput';

const CustomHeaderModal = (props: NativeStackHeaderProps) => {
    const [search, setSearch] = useState("")
    const { navigation } = props
    return (
        <View className='flex flex-row justify-start items-center w-full h-[70px] px-5 bg-secondary py-4'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
                />
            </View>
        </View>
    )
}

export default CustomHeaderModal