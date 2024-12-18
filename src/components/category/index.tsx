import { Text, Pressable, PressableProps, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '@/styles/colors';
import { styles } from './styles';

import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = PressableProps & {
    name: string;
    icon: keyof typeof MaterialIcons.glyphMap; // extrai tipagem baseada nas chaves, que são os ícones.
    isSelected: boolean
}

export function Category({ name, icon, isSelected, ...rest }: Props) {
    const scale = useSharedValue(1);
    
    const color = isSelected ? colors.green[300] : colors.gray[400];

    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: scale.value}]
        }
    })

    function onPressIn() {
        scale.value = withTiming(1.1, {duration: 300});
    }

    function onPressOut() {
        scale.value = withTiming(1, {duration: 300})
    }

    return (
        <Pressable { ...rest } onPressIn={ onPressIn } onPressOut={ onPressOut }>
            <Animated.View style={ [styles.container, animatedContainerStyle] } entering={FadeIn} exiting={FadeOut}>
                <MaterialIcons name={ icon } size={ 16 } color={ color } />
                <Text style={ [styles.name, { color }] }>{ name }</Text>
            </Animated.View>
        </Pressable>
    )
}
