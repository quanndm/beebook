import { Appwrite } from '@/configs'
import { Images } from '@/constants'
import { useTeamStore, useUserStore } from '@/store'
import { Team, User } from '@/types'
import { Redirect } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native'

const index = () => {
    const { setUser, setIsLoggedIn, setIsLoading, user } = useUserStore()
    const { setTeam } = useTeamStore()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const result = await Appwrite.auth.getCurrentUser();
                if (result) {
                    const user = (result as unknown) as User;

                    setUser(user);
                    setIsLoggedIn(true);

                    await Appwrite.team.getTeamInfo(user.translationTeams?.$id!).then((team) => {
                        if (team) {
                            setTeam(team as unknown as Team);
                        }
                    });

                } else {
                    setUser(null);
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
                setLoading(false);
            }
        })();
    }, [])

    if (loading) {
        return (
            <View className='w-full h-full items-center justify-center bg-white'>
                <Image
                    source={Images.ellipse_loading}
                    className='w-[100px] h-[100px]'
                />
            </View>
        )
    }

    if (!user) {
        return <Redirect href="/login" />;
    }
    return (
        <Redirect href="/(tabs)/home" />
    )
}

export default index
