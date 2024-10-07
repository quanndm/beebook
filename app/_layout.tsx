import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { NativeWindStyleSheet } from "nativewind";
import { MessageModal } from '@/components';
import { StatusBar } from 'expo-status-bar';
import { Appwrite } from '@/configs';
import { useUserStore } from '@/store';
import { User } from '@/types';

NativeWindStyleSheet.setOutput({
    default: "native",
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false, }} />
                <Stack.Screen
                    name="modal-search"
                    options={{
                        presentation: 'modal',
                        animation: 'slide_from_bottom',
                    }}
                />
                <Stack.Screen name="discover" />
                <Stack.Screen name="comic" options={{ headerShown: false, }} />
            </Stack>

            <MessageModal />
            <StatusBar hidden />

        </>
    );
}
