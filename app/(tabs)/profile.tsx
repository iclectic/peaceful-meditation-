import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import AppGradient from '@/components/AppGradient';
import ThemeToggle from '@/components/ThemeToggle';
import LoadingSpinner from '@/components/LoadingSpinner';

interface UserStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  favoriteCategory: string;
}

const Profile: React.FC = () => {
  const { colors, isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock user data - in a real app, this would come from your backend/storage
  const [userStats] = useState<UserStats>({
    totalSessions: 47,
    totalMinutes: 235,
    currentStreak: 7,
    longestStreak: 21,
    favoriteCategory: 'Ocean Waves'
  });

  const [userName] = useState('Tubo-ibim');

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleExportData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Your meditation data has been exported!');
    }, 2000);
  };

  const StatCard: React.FC<{ title: string; value: string | number; icon: string; color: string }> = 
    ({ title, value, icon, color }) => (
    <View 
      className="flex-1 p-4 rounded-xl mx-1 mb-4"
      style={{ backgroundColor: colors.surface }}
    >
      <View className="flex-row items-center justify-between mb-2">
        <Ionicons name={icon as any} size={24} color={color} />
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          {value}
        </Text>
      </View>
      <Text className="text-sm" style={{ color: colors.textSecondary }}>
        {title}
      </Text>
    </View>
  );

  const SettingsItem: React.FC<{ title: string; subtitle?: string; icon: string; onPress: () => void }> = 
    ({ title, subtitle, icon, onPress }) => (
    <Pressable
      onPress={onPress}
      className="flex-row items-center p-4 rounded-xl mb-3"
      style={{ backgroundColor: colors.surface }}
    >
      <View 
        className="w-10 h-10 rounded-full items-center justify-center mr-4"
        style={{ backgroundColor: colors.primary + '20' }}
      >
        <Ionicons name={icon as any} size={20} color={colors.primary} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium" style={{ color: colors.text }}>
          {title}
        </Text>
        {subtitle && (
          <Text className="text-sm mt-1" style={{ color: colors.textSecondary }}>
            {subtitle}
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </Pressable>
  );

  return (
    <View className="flex-1">
      <AppGradient colors={isDark ? ["#111827", "#1F2937", "#374151"] : ["#F8FAFC", "#E2E8F0", "#CBD5E1"]}>
        <SafeAreaView className="flex-1 px-4">
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="items-center py-8">
              <View 
                className="w-24 h-24 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-3xl font-bold text-white">
                  {userName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                Welcome, {userName}
              </Text>
              <Text className="text-base" style={{ color: colors.textSecondary }}>
                Your mindfulness journey continues
              </Text>
            </View>

            {/* Statistics */}
            <View className="mb-6">
              <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>
                Your Progress
              </Text>
              
              <View className="flex-row">
                <StatCard 
                  title="Total Sessions" 
                  value={userStats.totalSessions} 
                  icon="calendar-outline" 
                  color={colors.primary} 
                />
                <StatCard 
                  title="Minutes Meditated" 
                  value={userStats.totalMinutes} 
                  icon="time-outline" 
                  color={colors.accent} 
                />
              </View>
              
              <View className="flex-row">
                <StatCard 
                  title="Current Streak" 
                  value={`${userStats.currentStreak} days`} 
                  icon="flame-outline" 
                  color="#F59E0B" 
                />
                <StatCard 
                  title="Best Streak" 
                  value={`${userStats.longestStreak} days`} 
                  icon="trophy-outline" 
                  color="#EF4444" 
                />
              </View>
            </View>

            {/* Achievements */}
            <View className="mb-6">
              <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>
                Recent Achievement
              </Text>
              <View 
                className="p-4 rounded-xl flex-row items-center"
                style={{ backgroundColor: colors.surface }}
              >
                <LinearGradient
                  colors={['#F59E0B', '#EF4444']}
                  className="w-12 h-12 rounded-full items-center justify-center mr-4"
                >
                  <Ionicons name="star" size={24} color="white" />
                </LinearGradient>
                <View className="flex-1">
                  <Text className="text-base font-semibold" style={{ color: colors.text }}>
                    Week Warrior
                  </Text>
                  <Text className="text-sm" style={{ color: colors.textSecondary }}>
                    Completed 7 days in a row
                  </Text>
                </View>
              </View>
            </View>

            {/* Settings */}
            <View className="mb-6">
              <Text className="text-xl font-bold mb-4" style={{ color: colors.text }}>
                Settings
              </Text>
              
              <View className="mb-4">
                <Text className="text-base font-medium mb-3" style={{ color: colors.text }}>
                  Theme
                </Text>
                <ThemeToggle />
              </View>

              <SettingsItem
                title="Edit Profile"
                subtitle="Update your personal information"
                icon="person-outline"
                onPress={handleEditProfile}
              />
              
              <SettingsItem
                title="Notifications"
                subtitle="Manage your meditation reminders"
                icon="notifications-outline"
                onPress={() => Alert.alert('Notifications', 'Notification settings coming soon!')}
              />
              
              <SettingsItem
                title="Export Data"
                subtitle="Download your meditation history"
                icon="download-outline"
                onPress={handleExportData}
              />
              
              <SettingsItem
                title="About"
                subtitle="Learn more about Peaceful Meditation"
                icon="information-circle-outline"
                onPress={() => Alert.alert('About', 'Peaceful Meditation v1.0.0\nBuilt with ❤️ for mindfulness')}
              />
            </View>

            {/* Loading Overlay */}
            {isLoading && (
              <View className="absolute inset-0 items-center justify-center" style={{ backgroundColor: colors.background + '80' }}>
                <View 
                  className="p-6 rounded-xl items-center"
                  style={{ backgroundColor: colors.surface }}
                >
                  <LoadingSpinner size={40} />
                  <Text className="mt-4 text-base font-medium" style={{ color: colors.text }}>
                    Exporting your data...
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </AppGradient>
    </View>
  );
};

export default Profile;
