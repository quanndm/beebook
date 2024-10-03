import { View, Text, ScrollView, TextInput, FlatList } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CustomIcon } from '../common'
import { Colors } from '@/constants'

type BottomSheetFilterProps = {
    bottomSheetRef: React.RefObject<BottomSheetMethods>
}

const categoryList = [
    {
        id: 1,
        name: 'old_europe',
        name_vn: 'Âu cổ',
    },
    {
        id: 2,
        name: 'potent',
        name_vn: 'Bá đạo',
    },
    {
        id: 3,
        name: 'retaliate',
        name_vn: 'Báo thù',
    },
    {
        id: 4,
        name: 'otherworldly',
        name_vn: 'Dị giới',
    },
    {
        id: 5,
        name: "dysfunction",
        name_vn: "Dị năng",
    },
    {
        id: 6,
        name: "alien_race",
        name_vn: "Dị tộc",
    },
    {
        id: 7,
        name: "drama",
        name_vn: "Drama",
    },
    {
        id: 8,
        name: "mage",
        name_vn: "Đạo sĩ",
    },
    {
        id: 9,
        name: "urban",
        name_vn: "Đô thị",
    },
    {
        id: 10,
        name: "comedy",
        name_vn: "Hài hước",
    },
    {
        id: 11,
        name: "action",
        name_vn: "Hành động",
    },
    {
        id: 12,
        name: "system",
        name_vn: "Hệ thống",
    },
    {
        id: 13,
        name: "magical",
        name_vn: "Huyền huyễn",
    },
    {
        id: 14,
        name: "horror",
        name_vn: "Kinh dị",
    },
    {
        id: 15,
        name: "end_of_the_world",
        name_vn: "Mạt thế",
    },
    {
        id: 16,
        name: "through_space",
        name_vn: "Xuyên không",
    }
]

const BottomSheetFilter = (props: BottomSheetFilterProps) => {
    const { bottomSheetRef } = props

    // snap points
    const snapPoints = useMemo(() => ["85%"], []);

    // backdrop
    const backdropComponent = useMemo(() => {
        return (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.3} />
        );
    }, []);


    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={-1}
            backdropComponent={backdropComponent}
            backgroundStyle={{ backgroundColor: Colors.Secondary_2 }}
        >
            <BottomSheetView className='w-full h-full flex-1' >
                <ScrollView className='w-full px-4' >
                    {/* header */}
                    <View className='flex flex-row justify-between items-center mb-4'>
                        <Text className='text-2xl font-semibold text-white'>Bộ lọc</Text>
                        <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
                            <CustomIcon name='close' color='red' />
                        </TouchableOpacity>
                    </View>

                    {/* content */}
                    {/* section 1 */}
                    <View className='flex flex-row justify-between items-center p-2 rounded-lg mb-4' style={{ backgroundColor: Colors.Secondary_3 }}>
                        <Text className='text-white'>Số chương lớn hơn</Text>
                        <View>
                            <TextInput
                                className='w-16 h-8 rounded-lg px-2 text-white'
                                style={{ backgroundColor: Colors.Secondary_4 }}
                                keyboardType='number-pad'
                                defaultValue='0'
                            />
                        </View>
                    </View>

                    {/* section 2 */}
                    <View className='p-2 mb-4 rounded-lg' style={{ backgroundColor: Colors.Secondary_3 }}>
                        <Text className='text-white py-2'>Thể loại</Text>
                        <View className='h-[1px] bg-slate-500' />
                        <FlatList
                            data={categoryList}
                            numColumns={2}
                            columnWrapperStyle={{
                                flex: 1,
                            }}
                            scrollEnabled={false}
                            keyExtractor={item => item.id.toString()}
                            ItemSeparatorComponent={() => <View className='h-[1px] bg-slate-500' />}
                            renderItem={({ item }) => (
                                <View className='flex flex-row justify-start items-center gap-2 py-2 flex-1'>
                                    <TouchableOpacity className='w-4 h-4 rounded-full bg-white flex justify-center items-center border'>
                                        <View className='w-2 h-2 rounded-full' style={{ backgroundColor: Colors.Primary }}></View>
                                    </TouchableOpacity>
                                    <Text className='text-white'>{item.name_vn}</Text>
                                </View>
                            )}
                        />
                    </View>

                    {/* section 3 */}
                    <View className='p-2 mb-4 rounded-lg' style={{ backgroundColor: Colors.Secondary_3 }}>
                        <Text className='text-white py-2'>Sắp xếp</Text>
                        <View className='h-[1px] bg-slate-500' />
                        <View className='py-2 flex-row justify-between items-center'>

                            <View className=' flex-row justify-start items-center gap-2'>
                                <TouchableOpacity className='w-4 h-4 rounded-full bg-white flex justify-center items-center border border-primary'>
                                    <View className='w-2 h-2 rounded-full' style={{ backgroundColor: Colors.Primary }}></View>
                                </TouchableOpacity>
                                <Text className='text-white'>Mới</Text>
                            </View>

                            <View className=' flex-row justify-start items-center gap-2'>
                                <TouchableOpacity className='w-4 h-4 rounded-full bg-white flex justify-center items-center border border-primary'>
                                    <View className='w-2 h-2 rounded-full' style={{ backgroundColor: Colors.Primary }}></View>
                                </TouchableOpacity>
                                <Text className='text-white'>Lượt xem</Text>
                            </View>

                            <View className=' flex-row justify-start items-center gap-2'>
                                <TouchableOpacity className='w-4 h-4 rounded-full bg-white flex justify-center items-center border border-primary'>
                                    <View className='w-2 h-2 rounded-full' style={{ backgroundColor: Colors.Primary }}></View>
                                </TouchableOpacity>
                                <Text className='text-white'>Theo dõi</Text>
                            </View>
                        </View>
                    </View>

                    {/* section 4 */}
                    <View className='p-2 mb-4 rounded-lg' style={{ backgroundColor: Colors.Secondary_3 }}>
                        <Text className='text-white py-2'>Trạng thái</Text>
                        <View className='h-[1px] bg-slate-500' />
                        <View className='py-2 flex-row justify-around items-center'></View>

                        <View className='py-2 flex-row justify-evenly items-center'>

                            <View className=' flex-row justify-start items-center gap-2'>
                                <TouchableOpacity className='w-4 h-4 rounded-full bg-white flex justify-center items-center border border-primary'>
                                    <View className='w-2 h-2 rounded-full' style={{ backgroundColor: Colors.Primary }}></View>
                                </TouchableOpacity>
                                <Text className='text-white'>Mới</Text>
                            </View>

                            <View className=' flex-row justify-start items-center gap-2'>
                                <TouchableOpacity className='w-4 h-4 rounded-full bg-white flex justify-center items-center border border-primary'>
                                    <View className='w-2 h-2 rounded-full' style={{ backgroundColor: Colors.Primary }}></View>
                                </TouchableOpacity>
                                <Text className='text-white'>Lượt xem</Text>
                            </View>
                        </View>
                    </View>

                    {/* footer */}
                    <View className='flex flex-row justify-evenly items-center mb-4'>
                        <TouchableOpacity className='bg-primary rounded-3xl p-2 w-36 h-10 items-center justify-center'>
                            <Text className='text-white text-base'>Áp dụng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='rounded-3xl p-2 w-36 h-10 items-center justify-center' style={{ backgroundColor: Colors.Inactive }}>
                            <Text className='text-gray-500 text-base'>Đặt lại</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </BottomSheetView>
        </BottomSheet>
    )
}

export default BottomSheetFilter