import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop, useColorScheme } from 'nativewind';
import { View } from 'react-native';

cssInterop(LinearGradient, { className: 'style' });

export function Gradient() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="absolute size-full">
      <LinearGradient
        colors={
          isDark
            ? ['rgba(15,16,20,0)', 'rgba(15,16,20,1)']
            : ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
        }
        className="absolute bottom-0 h-1/2 w-full"
      />
      <LinearGradient
        colors={['rgba(15,16,20,1)', 'rgba(15,16,20,0)']}
        className="absolute top-0 h-1/2 w-full"
      />
    </View>
  );
}
