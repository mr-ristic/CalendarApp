import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { MainTabScreenProps } from 'app/navigators/types';
import { Screen, Text } from 'app/components';
import { colors } from 'app/theme';

export const HomeScreen: FC<MainTabScreenProps<'Home'>> = observer(function HomeScreen() {
  return (
    <Screen style={$root} preset="fixed">
      <Text tx="homeScreen.title" />
      <Text tx="homeScreen.body" />
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.backgroundBody
};
