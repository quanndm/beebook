import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { CustomIcon, TabDetail, TabChapter } from '@/components'
import { Colors } from '@/constants'
import { Appwrite } from '@/configs'
import { Comic, ComicChapter } from '@/types'
import { TabBar, TabView } from 'react-native-tab-view';


const index = () => {
    const { comicId } = useLocalSearchParams()
    const [comic, setComic] = useState<Comic | undefined>(undefined)
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [listChapter, setListChapter] = useState<ComicChapter[] | undefined>([])
    const loadComicDetail = async () => {

        try {
            const res = await Appwrite.comic.getComic(comicId as string)
            if (res) {

                setComic(res)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getChapterList = async () => {
        try {
            const res = await Appwrite.chapter.getChapters(comicId as string)
            setListChapter(res)
        } catch (error) {
            console.log(error)
        }
    }

    const load = async () => {
        setIsLoading(true)
        await Promise.all([loadComicDetail(), getChapterList()])
        setIsLoading(false)
    }

    const renderScene = ({ route }: {
        route: {
            key: string;
            title: string;
        }
    }) => {
        switch (route.key) {
            case 'detail':
                return <TabDetail comic={comic as Comic} isLoading={isLoading} />;
            case 'chapter':
                return <TabChapter chapters={listChapter as ComicChapter[]} isLoading={isLoading} />;
            default:
                return null;
        }
    };

    const routes = [
        { key: 'detail', title: 'Thông tin truyện' },
        { key: 'chapter', title: 'Chương' },
    ];

    useLayoutEffect(() => {
        load()
    }, [])
    return (
        <>
            <Stack.Screen
                options={{
                    contentStyle: { borderBottomWidth: 0 },
                    headerStyle: { backgroundColor: Colors.Primary },
                    headerTitleStyle: { color: "#fff" },
                    headerLeft: (props) => (
                        <CustomIcon
                            name="arrow-back"
                            size={24}
                            color="#fff"
                            onPress={() => router.replace(`/(tabs)/home`)}
                            className='mr-2'
                        />
                    ),
                    title: comic?.name ?? "",

                }}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                style={{ backgroundColor: Colors.Secondary }}
                renderTabBar={(props) => (<>
                    <TabBar {...props}
                        style={{ backgroundColor: Colors.Primary, borderWidth: 0 }}
                        pressColor={"rgba(255, 194, 78, 0.2)"} // same color as primary with 0.2 opacity
                        indicatorStyle={{ backgroundColor: Colors.Primary }}
                        renderLabel={({ route, focused, color }) => (
                            <Text style={{ color }} className='m-2 font-bold'>
                                {route.title}
                            </Text>
                        )}
                    />
                </>)}
            />
        </>
    )
}

export default index