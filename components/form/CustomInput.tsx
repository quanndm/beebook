import { Alert, Image, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FormFieldProps } from '@/types'
import { CustomIcon } from '../common/CustomIcon'


const CustomInput = (props: FormFieldProps) => {
    const { label, value, onChangeText, placeholder, customContainerStyleClassName, keyboardType, isSearch, heightInput } = props
    const [showPassword, setShowPassword] = useState(false)
    const conditionOfPassword = () => {
        return [label, placeholder].includes('Password') || [label, placeholder].includes('Confirm Password')
    }

    return (
        <View className={`space-y-2 ${customContainerStyleClassName ?? "my-4"}`}>
            {label && <Text className='text-base text-gray-100'>{label}</Text>}
            <View className='border-2 border-gray-400 w-full  px-4 bg-black-100 rounded-3xl focus:border-primary items-center flex-row '
                style={{ height: heightInput ?? 64, backgroundColor: "#3D3D3D" }}
            >
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                        if (isSearch) {
                            Alert.alert('Search', value)
                        }
                    }}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    placeholderTextColor={'#8b8b8f'}
                    className='w-full h-full flex-1 text-white font-semibold text-base '
                    secureTextEntry={conditionOfPassword() && !showPassword}
                />
                {conditionOfPassword() && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        {/* <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' /> */}

                        <CustomIcon name={!showPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color='#8b8b8f' />
                    </TouchableOpacity>
                )}
                {isSearch && (
                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss()
                            Alert.alert('Search', value)
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
