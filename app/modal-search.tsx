import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Comic, CustomHeaderModal, TabBarTop, TranslateTeam } from '@/components';
import { Colors } from '@/constants';
import { SceneMap, TabView } from 'react-native-tab-view';



const renderScene = SceneMap({
    comic: Comic,
    translationTeam: TranslateTeam,
});


const ModalScreen = () => {

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        { key: 'comic', title: 'Truyện' },
        { key: 'translationTeam', title: 'Nhóm dịch' },
    ]);

    return (
        <View className='h-full w-full flex-1'>
            <Stack.Screen
                options={{
                    header: (props) => <CustomHeaderModal {...props} />,
                }}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={(props) => <TabBarTop {...props} />}
            />
            <StatusBar hidden />
        </View>
    );
}

export default ModalScreen
