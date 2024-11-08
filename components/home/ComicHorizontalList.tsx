import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { ComicCard } from '../common'
import { Comic } from '@/types'

type ComicHorizontalListProps = {
    data: Comic[] | undefined
}

const ComicHorizontalList = (props: ComicHorizontalListProps) => {
    const { data } = props
    return (
        <FlatList
            data={data}
            keyExtractor={item => item.$id}
            renderItem={({ item, index }) => {
                return (
                    <ComicCard
                        id={item.$id}
                        image={item.thumbnailUrl}
                        title={item.name}
                        chapter={item.totalChapter}
                        customContainerClassName={index === data!.length - 1 ? 'mr-6' : ''}
                    />
                )
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            className='px-4'
            ListEmptyComponent={<>
                <View>
                    <Text>Không có dữ liệu</Text>
                </View>
            </>}
        />
    )
}

export default ComicHorizontalList