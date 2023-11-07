import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { Screen, Text } from 'app/components';
import { MainTabScreenProps } from 'app/navigators/types';
import { colors } from 'app/theme';

export const ShopScreen: FC<MainTabScreenProps<'Shop'>> = observer(function ShopScreen() {
  return (
    <Screen style={$root} preset="fixed">
      <Text tx="shopScreen.title" />
      <Text tx="shopScreen.body" />
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.backgroundBody
};
