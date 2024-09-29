import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { NativeWindStyleSheet } from "nativewind";
import { MessageModal } from '@/components';

NativeWindStyleSheet.setOutput({
    default: "native",
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useEffect(() => {
        setTimeout(async () => {
            SplashScreen.hideAsync()
        }, 1000);
    }, [])



    return (
        <>
            <Stack>
                <Stack.Screen name="index" redirect />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false, }} />
                <Stack.Screen
                    name="modal-search"
                    options={{
                        presentation: 'modal',
                    }}
                />
                <Stack.Screen name="discover" options={{ headerShown: false }} />
            </Stack>

            <MessageModal />
        </>
    );
}
