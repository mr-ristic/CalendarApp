import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon, Text } from '../components';
import { HomeScreen, CalendarScreen, ChatScreen, OptionsScreen, ShopScreen } from 'app/screens';
import { colors, spacing, typography } from '../theme';
import { MainNavigatorParamList } from './types';

const Tab = createBottomTabNavigator<MainNavigatorParamList>();

export const MainNavigator = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => focused && <Text style={$tabText} tx="homeScreen.title" />,
          tabBarIcon: ({ focused }) => (
            <Icon icon="home" color={focused ? colors.tint : colors.text} size={30} />
          )
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: ({ focused }) =>
            focused && <Text style={$tabText} tx="calendarScreen.title" />,
          tabBarIcon: ({ focused }) => (
            <Icon icon="calendar" color={focused ? colors.tint : colors.text} size={30} />
          )
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarLabel: ({ focused }) => focused && <Text style={$tabText} tx="shopScreen.title" />,
          tabBarIcon: ({ focused }) => (
            <Icon icon="shop" color={focused ? colors.tint : colors.text} size={30} />
          )
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: ({ focused }) => focused && <Text style={$tabText} tx="chatScreen.title" />,
          tabBarIcon: ({ focused }) => (
            <Icon icon="chat" color={focused ? colors.tint : colors.text} size={30} />
          )
        }}
      />
      <Tab.Screen
        name="Options"
        component={OptionsScreen}
        options={{
          tabBarLabel: ({ focused }) =>
            focused && <Text style={$tabText} tx="optionsScreen.title" />,
          tabBarIcon: ({ focused }) => (
            <Icon icon="more" color={focused ? colors.tint : colors.text} size={30} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent
};

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md
};

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1
};

const $tabText: TextStyle = {
  color: colors.tint,
  fontSize: 10,
  lineHeight: 12
};
