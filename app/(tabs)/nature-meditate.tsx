import { View, Text, FlatList, Pressable, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AppGradient from '@/components/AppGradient';
import LoadingSpinner from '@/components/LoadingSpinner';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/contexts/ThemeContext';

import { MEDITATION_DATA } from '@/constants/meditationData';
import MEDITATION_IMAGES from '@/constants/meditation-images';
import { LinearGradient } from 'expo-linear-gradient';

const NatureMeditate = () => {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleMeditationPress = async (item: any) => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/meditation-timer?id=${item.id}`);
    }, 1000);
  };

  return (
    <View className='flex-1'>
        <AppGradient colors={isDark ? ["#111827", "#1F2937", "#374151"] : ["#F8FAFC", "#E2E8F0", "#CBD5E1"]}>
            <View className='mb-6 px-4 pt-8'>
                <Text className="mb-3 font-bold text-4xl text-left" style={{ color: colors.text }}>
                    Welcome Tubo-ibim
                </Text>
                <Text className="text-xl font-medium" style={{ color: colors.textSecondary }}>
                    Start your meditation practice today
               </Text> 
            </View>
            <View className='px-4'>
                <FlatList 
                    data={MEDITATION_DATA} 
                    className='mb-20' 
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item}) => (
                        <Pressable
                            onPress={() => handleMeditationPress(item)}
                            className='h-48 my-3 rounded-xl overflow-hidden'
                            style={{ 
                              shadowColor: colors.text,
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: 0.1,
                              shadowRadius: 8,
                              elevation: 5,
                            }}
                        >
                             <ImageBackground
                                 source={MEDITATION_IMAGES[item.id - 1]}
                                 resizeMode="cover"
                                 className='flex-1 rounded-xl justify-center'
                             >  
                                <LinearGradient 
                                    colors={[ 
                                        "transparent", 
                                        "rgba(0, 0, 0, 0.7)",
                                         ]}
                                         className='flex-1 justify-center items-center rounded-xl'
                                >
                                <Text className='text-white text-3xl font-bold text-center px-4'>
                                {item.title}
                              </Text>
                              <Text className='text-gray-200 text-base text-center mt-2 px-4'>
                                Tap to begin meditation
                              </Text>
                              </LinearGradient>
                             </ImageBackground>
                        </Pressable>
                    )}
                />
            </View>
            
            {/* Loading Overlay */}
            {isLoading && (
              <View 
                className="absolute inset-0 items-center justify-center"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              >
                <View 
                  className="p-6 rounded-xl items-center"
                  style={{ backgroundColor: colors.surface }}
                >
                  <LoadingSpinner size={40} />
                  <Text className="mt-4 text-base font-medium" style={{ color: colors.text }}>
                    Preparing your meditation...
                  </Text>
                </View>
              </View>
            )}
            
            <StatusBar style={isDark ? "light" : "dark"} />
        </AppGradient>
    </View>
  );
};

export default NatureMeditate;
