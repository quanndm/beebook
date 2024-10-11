import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from '@/constants';
import { FemaleTab, MaleTab, TotalTab } from './rankingTabs';

const ComicRanking = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'total', title: 'Tổng' },
        { key: 'male', title: 'Truyện nam' },
        { key: 'female', title: 'Truyện nữ' }
    ]);
    const renderScene = SceneMap({
        total: TotalTab,
        male: MaleTab,
        female: FemaleTab
    });
    return (
        <View className='w-full h-[615px] px-4'>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props =>
                    <TabBar
                        style={{ backgroundColor: Colors.Primary, borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                        indicatorStyle={{ backgroundColor: Colors.Inactive, borderWidth: 1, borderColor: Colors.Inactive }}
                        renderLabel={({ route, focused, color }) => (
                            <Text style={{ color }} className='m-1 font-semibold text-base'>
                                {route.title}
                            </Text>
                        )}
                        {...props}
                    />
                }
            />
        </View>
    )
}

export default ComicRanking