import { View, Text, Alert, Image } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomHeaderDiscover } from '@/components';
import { Colors } from '@/constants';
import BottomSheet, { BottomSheetModalProvider, BottomSheetView, BottomSheetBackdropProps, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const discover = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    // snap points
    const snapPoints = useMemo(() => ["25%", "50%", "75%", "90%"], []);

    // backdrop
    const backdropComponent = useMemo(() => {
        return (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.3} />
        );
    }, []);

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
                    <BottomSheet
                        ref={bottomSheetRef}
                        onChange={handleSheetChanges}
                        snapPoints={snapPoints}
                        index={-1}
                        enablePanDownToClose={true}
                        backdropComponent={backdropComponent}
                    >
                        <BottomSheetView style={{
                            flex: 1,
                            alignItems: 'center',
                        }}>
                            <Text className='text-2xl font-semibold p-5'>Awesome 🎉</Text>
                        </BottomSheetView>
                    </BottomSheet>

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