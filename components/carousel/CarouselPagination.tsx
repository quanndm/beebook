import { View, Text, Animated, Dimensions } from 'react-native'
import React from 'react'
import { Colors } from '@/constants'

const CarouselPagination = (props: any) => {
    const { data, scrollX, index: idx } = props

    const { width } = Dimensions.get('screen')

    return (
        <View className='absolute bottom-6 flex-row w-full items-center justify-center gap-1 '>
            {data.map((_: any, index: number) => {
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

                const dotWidth = scrollX.interpolate({
                    inputRange: inputRange,
                    outputRange: [6, 16, 6],
                    extrapolate: 'clamp',
                })

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.2, 1, 0.1],
                    extrapolate: 'clamp',
                });

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: [Colors.Inactive, Colors.Primary, Colors.Inactive],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={index}
                        className='w-1.5 h-1.5 rounded-[12px]'
                        style={[
                            {
                                backgroundColor: backgroundColor,
                                width: dotWidth
                            },
                            index === idx && { backgroundColor: Colors.Primary, opacity }
                        ]}

                    />
                )
            })}
        </View>
    )
}

export default CarouselPagination