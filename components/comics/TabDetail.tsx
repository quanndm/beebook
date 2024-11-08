import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { Comic } from '@/types'
import { MaterialIndicator } from 'react-native-indicators'
import { Colors } from '@/constants'

type Props = {
    comic: Comic,
    isLoading: boolean
}

const TabDetail = (props: Props) => {
    const { comic, isLoading } = props

    return (
        <ScrollView>
            <View className='my-3' >
                <View className='flex-row gap-4 mx-3'>
                    <View className='w-2/6 h-[200px] bg-white'>
                        {isLoading ? (
                            <View className='flex-1 justify-center items-center w-full h-full'>
                                <MaterialIndicator color={Colors.Primary} />
                            </View>
                        ) :
                            <>
                                <Image
                                    source={{ uri: comic?.thumbnailUrl }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </>
                        }

                    </View>

                    <View className='flex-1 '>
                        <Text className='text-xl font-bold text-white'>{comic?.name}</Text>
                        <Text className='text-sm text-gray-400 mb-2'>Đang tiến hành</Text>
                        <View className='flex-row mb-2'>
                            <Text className='text-sm text-gray-400'>Nhóm dịch: </Text>
                            <Text className='text-sm text-white'>{comic?.translationTeam.name}</Text>
                        </View>
                        <View className='flex-row mb-2'>
                            <Text className='text-sm text-gray-400'>Thể loại: </Text>
                            <Text className='text-sm text-white'>{comic?.comicCategory?.name}</Text>
                        </View>
                        <View className='flex-row mb-2'>
                            <Text className='text-sm text-gray-400'>Số chương: </Text>
                            <Text className='text-sm text-white'>{comic?.totalChapter}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View className='border-b border-white mx-5 mt-5' />
                </View>

                <View className='mx-5 mt-3 min-h-[300px]'>
                    <Text className='text-white flex-wrap' > {comic?.description} </Text>
                </View>


            </View>
        </ScrollView>
    )
}

export default TabDetail