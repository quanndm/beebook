import { View, Text } from 'react-native'
import React from 'react'
import { NavigationState, SceneRendererProps, TabBar } from 'react-native-tab-view';
import { TabBarTopProps } from '@/types';
import { Colors } from '@/constants';



const TabBarTop = (props: TabBarTopProps) => {
    return (
        <>
            <TabBar {...props}
                style={{ backgroundColor: Colors.Secondary }}
                pressColor={"rgba(255, 194, 78, 0.2)"} // same color as primary with 0.2 opacity

                indicatorStyle={{ backgroundColor: Colors.Primary }}
                renderLabel={({ route, focused, color }) => (
                    <Text style={{ color }} className='m-2 font-semibold'>
                        {route.title}
                    </Text>
                )}
            />
        </>
    )
}

export default TabBarTop