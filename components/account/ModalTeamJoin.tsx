import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants'
import { CustomIcon } from '../common'
import { Appwrite } from '@/configs'
import { useTeamStore, useUserStore } from '@/store'
import { Team } from '@/types'
import { MaterialIndicator } from 'react-native-indicators'



type ModalTeamJoinProps = {
    visible: boolean,
    setVisible: (visible: boolean) => void,
}

const ModalTeamJoin = (props: ModalTeamJoinProps) => {
    const { user, setUserTeam } = useUserStore()
    const { setTeam } = useTeamStore()
    const [code, setcode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const onJoinTeam = async () => {
        setIsLoading(true)
        try {
            const res = await Appwrite.team.jointTeam(code, user!)
            if (res) {
                const team = res as unknown as Team
                setTeam(team)
                setUserTeam(team)
            }
            setVisible(!visible)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const { setVisible, visible } = props
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                alert('Modal has been closed.');
                setVisible(!visible);
            }}>
            <View className='flex-1 justify-center items-center mt-6 w-full '>
                <View className='m-5 rounded-xl p-3 items-center w-3/4' style={{ backgroundColor: Colors.Secondary }}>
                    <View className='w-full flex-row justify-end'>
                        <TouchableOpacity onPress={() => setVisible(!visible)} >
                            <CustomIcon name="close" size={26} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className='w-full'>
                        <TextInput
                            className=' p-2 my-3 rounded-lg w-full text-white'
                            style={{ backgroundColor: Colors.Secondary_3 }}
                            placeholderTextColor={"#fff"}
                            placeholder='Nhập mã mời'
                            onChangeText={setcode}
                            value={code}
                        />
                        <View className='flex items-center'>
                            <TouchableOpacity disabled={isLoading} className='mb-3 w-1/2 p-3 rounded-lg' style={{ backgroundColor: Colors.Primary }} onPress={onJoinTeam} >
                                <View className='flex-row items-center justify-center'>
                                    {isLoading && (
                                        <View className='mr-2'>
                                            <MaterialIndicator size={18} color="#fff" />
                                        </View>
                                    )}
                                    <Text className='text-white font-bold text-center'>Xác nhận</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalTeamJoin