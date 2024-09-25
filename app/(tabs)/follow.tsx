import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants'
import { TabView, SceneMap } from 'react-native-tab-view';
import { ComicsTab, ReadingTab, TabBarTop, TranslationTeamTab } from '@/components';


const renderScene = SceneMap({
    comic: ComicsTab,
    translationTeam: TranslationTeamTab,
    reading: ReadingTab,
});

const Following = () => {

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        { key: 'comic', title: 'Truyện' },
        { key: 'translationTeam', title: 'Nhóm dịch' },
        { key: 'reading', title: 'Đang đọc' },
    ]);


    return (
        <SafeAreaView
            className={`flex-1 w-full h-full `}
            style={{ backgroundColor: Colors.Secondary_1 }}
        >
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={(props) => <TabBarTop {...props} />}
            />
        </SafeAreaView>
    )
}

export default Following