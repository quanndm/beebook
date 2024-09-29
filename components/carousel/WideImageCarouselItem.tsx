import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'



const WideImageCarouselItem = (props: any) => {
    const { item } = props
    const { width, height } = Dimensions.get('screen')
    return (
        <View style={{ width, height }} className='items-center rounded-2xl w-full'>
            <Image
                source={{ uri: item.image }}
                className='h-[180px] w-[93%] rounded-2xl'
                resizeMode='cover'
            />
        </View>
    )
}

export default WideImageCarouselItem