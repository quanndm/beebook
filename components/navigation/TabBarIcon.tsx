import { View, Text } from 'react-native'
import React from 'react'
import { CustomIcon } from '../common/CustomIcon';
import { type ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

export type TabIconProps = {
    nameIcon: ComponentProps<typeof Ionicons>['name'];
    color: string;
    label: string;
    focused: boolean;
}

const TabBarIcon = (props: TabIconProps) => {
    const { color, focused, label, nameIcon } = props
    return (
        <View className='items-center justify-center gap-2'>
            <CustomIcon name={nameIcon} color={color} />
            <Text
                className={`${focused ? 'font-semibold' : 'font-regular'} text-xs`}
                style={{ color }}
            >
                {label}
            </Text>
        </View>
    )
}

export default TabBarIcon