import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from '@/constants';

const FirstRoute = () => (
    <View style={{ backgroundColor: Colors.Secondary }} className='rounded-b-2xl flex-1'>
        <Text className='text-white'>First Route</Text>
    </View>
);

const SecondRoute = () => (
    <View style={{ backgroundColor: Colors.Secondary }} className='rounded-b-2xl flex-1' >
        <Text className='text-white'>Second Route</Text>
    </View>
);

const ThirdRoute = () => (
    <View style={{ backgroundColor: Colors.Secondary }} className='rounded-b-2xl flex-1' >
        <Text className='text-white'>Third Route</Text>
    </View>
);


const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
});

const ComicRanking = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' }
    ]);
    return (
        <View className='w-full h-[500px] px-4'>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props =>
                    <TabBar
                        style={{ backgroundColor: Colors.Primary, borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                        indicatorStyle={{ backgroundColor: Colors.Inactive }}
                        renderLabel={({ route, focused, color }) => (
                            <Text style={{ color }} className='m-2 font-semibold'>
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