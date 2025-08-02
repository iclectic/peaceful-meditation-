import { Stack } from 'expo-router'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import 'react-native-reanimated'

export default function RootLayout() {
    useEffect(() => {
        if (Platform.OS === 'web') {
            // Prevent hydration issues on web
            const style = document.createElement('style')
            style.textContent = `
                #root, body, html {
                    height: 100%;
                    overflow: hidden;
                }
            `
            document.head.appendChild(style)
        }
    }, [])

    return (
        <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ title: 'Welcome' }} />
                <Stack.Screen name="(tabs)" options={{ title: 'App' }} />
            </Stack>
        </ThemeProvider>
    )
}