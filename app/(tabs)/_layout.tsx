import { CustomHeader, TabBarIcon } from '@/components';
import { Colors } from '@/constants';
import { useMessageModalStore, useUserStore } from '@/store';
import { router, Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    const { setinfoModal, closeModal, resetModal } = useMessageModalStore()
    const { user, isLoggedIn } = useUserStore()
    const openSearchModal = () => {
        router.push('/search')
    }
    const openNotificationModal = () => {
        router.push('/notification')
    }
    const setInfoWarningAlert = () => {
        setinfoModal({
            header: 'Thông báo',
            message: 'Bạn cần đăng nhập để sử dụng chức năng này',
            type: 'warning',
            acceptAction: {
                text: 'Đăng nhập',
                onPress: () => {
                    router.replace('/login');
                    closeModal()
                    resetModal()
                }
            },
            cancelAction: {
                text: 'Đóng',
                onPress: () => {
                    closeModal()
                    resetModal()
                }
            }
        })
    }
    const checkUserLoggedIn = () => {
        return isLoggedIn && user ? true : false;
    }
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.Primary_1,
                tabBarInactiveTintColor: Colors.Inactive,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: Colors.Secondary,
                    height: 70,
                    borderTopWidth: 0,
                }
            }}
            screenListeners={{
                tabPress: (e) => {
                    const target = e.target?.split("-")[0];
                    if (target === "account" && !checkUserLoggedIn()) {
                        setInfoWarningAlert();
                        e.preventDefault();
                    }
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            nameIcon={focused ? 'home' : 'home-outline'}
                            color={color}
                            label='Home'
                            focused={focused}
                        />
                    ),
                    headerShown: true,
                    header: (props) => <CustomHeader label='Trang chủ' showSearch openSearchModal={openSearchModal} openNotificationModal={openNotificationModal} />,

                }}

            />
            <Tabs.Screen
                name="follow"
                options={{
                    title: 'Theo dõi',

                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            nameIcon={focused ? 'heart' : 'heart-outline'}
                            color={color}
                            label='Theo dõi'
                            focused={focused}
                        />
                    ),
                    headerShown: true,
                    header: (props) => <CustomHeader label='Theo dõi' openNotificationModal={openNotificationModal} />,
                }}
            />

            <Tabs.Screen
                name="feed"
                options={{
                    title: 'Bảng tin',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            nameIcon={focused ? 'document-text' : 'document-text-outline'}
                            color={color}
                            label='Bảng tin'
                            focused={focused}
                        />
                    ),
                    headerShown: true,
                    header: (props) => <CustomHeader label='Bảng tin' openNotificationModal={openNotificationModal} />,
                }}
            />

            <Tabs.Screen
                name="account"
                options={{
                    title: 'Tài khoản',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            nameIcon={focused ? 'person' : 'person-outline'}
                            color={color}
                            label='Tài khoản'
                            focused={focused}
                        />
                    ),

                }}
            />
        </Tabs>
    );
}
