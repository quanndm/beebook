import { Alert, Image, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FormFieldProps } from '@/types'
import { CustomIcon } from '../common/CustomIcon'


const CustomInput = (props: FormFieldProps) => {
    const { label, value, onChangeText, placeholder, customContainerStyleClassName, keyboardType, isSearch, heightInput, secureTextEntry, editable, multiline, numberOfLines, callbackSearch } = props
    const [showPassword, setShowPassword] = useState(secureTextEntry)

    return (
        <View className={`space-y-2 ${customContainerStyleClassName ?? "my-4"}`}>
            {label && <Text className='text-base text-gray-100'>{label}</Text>}
            <View className='border-2 border-gray-400 w-full  px-4 bg-black-100 rounded-2xl focus:border-primary items-center flex-row '
                style={[
                    { minHeight: heightInput ?? 64, backgroundColor: "#3D3D3D", maxHeight: 175 },
                ]}
            >
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                        if (isSearch) {
                            callbackSearch?.()
                        }
                    }}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    placeholderTextColor={'#8b8b8f'}
                    className='w-full h-full flex-1 text-white font-semibold text-base '
                    secureTextEntry={showPassword}
                    editable={editable ?? true}
                    multiline={multiline ?? false}
                    numberOfLines={numberOfLines ?? 1}

                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <CustomIcon name={!showPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color='#8b8b8f' />
                    </TouchableOpacity>
                )}
                {isSearch && (
                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss()
                            callbackSearch?.()
                        }}
                    >
                        <CustomIcon name='search-outline' size={24} color='#8b8b8f' />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default CustomInput
