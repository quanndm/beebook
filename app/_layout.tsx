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
import { Colors } from '@/constants';

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
                    name="search"
                    options={{
                        presentation: 'modal',
                        animation: 'slide_from_bottom',
                    }}
                />
                <Stack.Screen
                    name="notification"
                    options={{
                        presentation: 'modal',
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen name="comic" options={{ headerShown: false, }} />
                <Stack.Screen name="(team)" options={{ headerShown: false, }} />
            </Stack>

            <MessageModal />
            <StatusBar hidden backgroundColor={Colors.Secondary_1} />

        </>
    );
}
