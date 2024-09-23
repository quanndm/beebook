// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

type Props = IconProps<ComponentProps<typeof Ionicons>['name']> & {
    size?: number,
};

export function CustomIcon({ style, ...rest }: Props) {
    return <Ionicons size={rest.size ?? 28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
