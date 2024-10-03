import { View, Text, Alert, Image, ScrollView } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetFilter, CustomHeaderDiscover } from '@/components';
import { Colors } from '@/constants';
import BottomSheet, { BottomSheetModalProvider, BottomSheetView, BottomSheetBackdropProps, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const discover = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    // functions
    const handleOpenModal = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <SafeAreaView className='flex-1 p-4' style={{ backgroundColor: Colors.Secondary }}>
                    {/* Custom header */}
                    <Stack.Screen
                        options={{
                            title: 'My home',
                            headerStyle: { backgroundColor: '#f4511e' },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            header: (props) => <CustomHeaderDiscover {...props} openOptionModal={handleOpenModal} />,
                        }}
                    />

                    {/* Bottom sheet */}
                    <BottomSheetFilter bottomSheetRef={bottomSheetRef} />

                    {/* Content below */}
                    <View>
                        <Text className='text-white'>discover</Text>
                    </View>

                </SafeAreaView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

export default discover