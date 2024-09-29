import { View, Animated, FlatList, NativeSyntheticEvent, NativeScrollEvent, ViewToken } from 'react-native'
import React, { useRef, useState } from 'react'
import WideImageCarouselItem from './WideImageCarouselItem'
import CarouselPagination from './CarouselPagination'

// https://picsum.photos/800/400

const data = [
    {
        id: 1,
        image: 'https://picsum.photos/800/400',
    },
    {
        id: 2,
        image: 'https://picsum.photos/800/400',
    },
    {
        id: 3,
        image: 'https://picsum.photos/800/400',
    },
    {
        id: 4,
        image: 'https://picsum.photos/800/400',
    },
    {
        id: 5,
        image: 'https://picsum.photos/800/400',
    },
]

const WideImageCarousel = () => {
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
    }

    return (
        <View className='w-full h-48 rounded-2xl'>
            <FlatList
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <WideImageCarouselItem item={item} />
                    )
                }}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment='center'
                onScroll={handleScroll}
                onViewableItemsChanged={({ viewableItems }) => {
                    setIndex(viewableItems[0].index || 0)
                }}
                viewabilityConfig={{ itemVisiblePercentThreshold: 10 }}

            />
            <CarouselPagination data={data} scrollX={scrollX} index={index} />
        </View>
    )
}

export default WideImageCarousel