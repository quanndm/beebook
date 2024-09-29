import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { ComicCard } from '../common'

type ComicHorizontalListProps = {
    data: any[]
}

const ComicHorizontalList = (props: ComicHorizontalListProps) => {
    const { data } = props
    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item , index}) => {
                return (
                    <ComicCard
                        id={item.id}
                        image={item.image}
                        title={item.title}
                        chapter={item.chapter}
                        customContainerClassName={index === data.length - 1 ? 'mr-6' : ''}
                    />
                )
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            className='px-4'
        />
    )
}

export default ComicHorizontalList