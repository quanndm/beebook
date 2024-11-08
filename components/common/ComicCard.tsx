import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'
import { Images } from '@/constants'
import { router } from 'expo-router'

type ComicCardProps = {
    id: string
    image: string
    title: string
    chapter: number
    customContainerClassName?: string
}

const ComicCard = (props: ComicCardProps) => {

    const { customContainerClassName, id, image, title, chapter, } = props

    const handleClick = () => {
        router.push(`/comics/${id}`)
    }

    return (
        <TouchableOpacity
            className={`w-[150px] h-[270px] flex-1 overflow-hidden mr-2 ${customContainerClassName}`}
            activeOpacity={0.7}
            onPress={handleClick}
        >
            <Image source={{ uri: image }} resizeMode='cover' className='w-[150px] h-[230px] rounded-2xl' />
            <Text numberOfLines={1} ellipsizeMode='tail' className='text-white font-semibold'>{title}</Text>
            <Text className='text-gray-400 text-xs'>Chương {chapter}</Text>
        </TouchableOpacity >
    )
}

export default ComicCard