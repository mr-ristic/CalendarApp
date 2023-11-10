import { colors } from 'app/theme';
import styled from 'styled-components/native';

export const DayButton = styled.TouchableOpacity<{ $background: string }>`
  background: ${(props) => (props.$background ? props.$background : 'transparent')};
  display: flex;
  width: 46px;
  height: 46px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 12px;
`;

export const DayButtonText = styled.Text<{ $marked: boolean }>`
  color: ${(props) => (props.$marked ? colors.palette.primary700 : colors.tint)};
  font-size: 16px;
  line-height: 24px;
`;

export const Notification = styled.View<{ $selected: boolean }>`
  position: absolute;
  right: ${(props) => (props.$selected ? '-4px' : '4px')};
  top: ${(props) => (props.$selected ? '-4px' : '4px')};
  background: red;
  border-radius: 50%;
  width: ${(props) => (props.$selected ? '16px' : '6px')};
  height: ${(props) => (props.$selected ? '16px' : '6px')};
  background: ${colors.palette.accent500};
  justify-content: center;
  align-items: center;
`;

export const NotificationText = styled.Text`
  color: ${colors.tint};
  font-size: 10px;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 55px;
  padding: 0px 16px;
  justify-content: space-around;
  align-items: center;
`;

export const SelectedUserContainer = styled(UserContainer)`
  background: ${colors.backgroundBody};
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
`;

export const UserName = styled.Text`
  /* margin-left: 10px; */
  color: ${colors.tint};
  font-size: 14px;
  font-weight: 600;
  line-height: 55px;
  margin-left: 8px;
`;

export const UserSlider = styled.ScrollView`
  margin-top: 30px;
  background: red;
  background: ${colors.background};
  max-height: 56px;
  flex: 1;
`;
