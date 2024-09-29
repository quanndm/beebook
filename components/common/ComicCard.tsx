import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'
import { Images } from '@/constants'

type ComicCardProps = {
    id: number
    image: ImageSourcePropType
    title: string
    chapter: number
    customContainerClassName?: string
}

const ComicCard = (props: ComicCardProps) => {

    const { customContainerClassName } = props

    const handleClick = () => {
    }

    return (
        <TouchableOpacity
            className={`w-[150px] h-[270px] flex-1 overflow-hidden mr-2 ${customContainerClassName}`}
            activeOpacity={0.7}
            onPress={handleClick}
        >
            <Image source={Images.temp_bg_comic_1} resizeMode='cover' className='w-[150px] h-[230px] rounded-2xl' />
            <Text numberOfLines={1} ellipsizeMode='tail' className='text-white font-semibold'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, deserunt?</Text>
            <Text className='text-gray-400 text-xs'>Chương 1</Text>
        </TouchableOpacity >
    )
}

export default ComicCard