import { StyleSheet } from 'react-native'
import { NavigationState, SceneRendererProps } from 'react-native-tab-view';

export type FormFieldProps = {
    label?: string;
    heightInput?: number;
    value: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    customContainerStyleClassName?: string;
    isSearch?: boolean;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
    editable?: boolean;
}

export type AuthWrapperProps = {
    headerImage: React.ReactNode
    children: React.ReactNode,
    customContainerStyle?: StyleSheet.NamedStyles<any>
    customContainerClassName?: string
}

export type CustomBtnProps = {
    label: string
    handlePress?: () => void
    isLoading?: boolean
}

export type TabBarTopProps = SceneRendererProps & {
    navigationState: NavigationState<{
        key: string;
        title: string;
    }>;
}

export type CustomHeaderProps = {
    label: string
    showSearch?: boolean
    openSearchModal?: () => void
    openNotificationModal?: () => void
}

export type AlertType = 'info' | 'warning' | 'error' | 'success'

export type ActionBtn = {
    text: string,
    onPress: () => void
}

export type MessageModalProps = {
    type: AlertType,
    header: string,
    message: string,
    acceptAction?: ActionBtn,
    cancelAction?: ActionBtn
}

export type RegisterForm = {
    email: string,
    username: string,
    password: string,
    confirmPassword: string
}