import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { Screen, Text } from 'app/components';
import { MainTabScreenProps } from 'app/navigators/types';
import { colors } from 'app/theme';

export const ChatScreen: FC<MainTabScreenProps<'Chat'>> = observer(function ChatScreen() {
  return (
    <Screen style={$root} preset="fixed">
      <Text tx="chatScreen.title" />
      <Text tx="chatScreen.body" />
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.backgroundBody
};
