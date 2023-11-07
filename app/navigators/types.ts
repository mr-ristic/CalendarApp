import {
  CompositeScreenProps,
  NavigationContainer,
  NavigatorScreenParams
} from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  // 🔥 Your screens go here
  Main: NavigatorScreenParams<MainNavigatorParamList>;
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

export type MainNavigatorParamList = {
  Home: undefined;
  Calendar: undefined;
  Chat: undefined;
  Shop: undefined;
  Options: undefined;
};

export type MainTabScreenProps<T extends keyof MainNavigatorParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainNavigatorParamList, T>,
  NativeStackScreenProps<AppStackParamList>
>;

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}
