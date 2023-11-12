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
  border-radius: 50%;
  width: ${(props) => (props.$selected ? '16px' : '6px')};
  height: ${(props) => (props.$selected ? '16px' : '6px')};
  background: ${colors.palette.accent500};
  justify-content: center;
  align-items: center;
`;

export const UserNotification = styled(Notification)`
  background: ${colors.background};
  right: 2.5px;
  top: auto;
  bottom: -6px;
`;

export const NotificationText = styled.Text`
  color: ${colors.tint};
  font-size: 10px;
`;

export const UserContainer = styled.View`
  border-top-color: ${colors.headerBorder};
  border-top-width: 1px;
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
export const AvatarWrapper = styled.View`
  width: 40px;
  height: 40px;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
`;

export const UserName = styled.Text`
  color: ${colors.tint};
  font-size: 14px;
  font-weight: 600;
  line-height: 55px;
  margin-left: 8px;
`;

export const UserSlider = styled.ScrollView`
  padding-top: 18px;
  background: red;
  background: ${colors.background};
  max-height: 74px;
  min-height: 74px;
  flex: 1;
  z-index: -1;
`;

export const EventWrapper = styled.View<{ $top: number; $height: number }>`
  position: absolute;
  left: 90px;
  top: ${(props) => `${props.$top}px`};
  height: ${(props) => `${props.$height}px`};
  width: 70%;
  padding: 8px 8px 8px 16px;
  align-items: flex-start;
  border-radius: 12px;
  border: 1px solid ${colors.border};
  background-color: ${colors.background};
`;

export const EventTitle = styled.Text`
  color: ${colors.tint};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 10px;
`;
export const EventTime = styled.Text`
  color: ${colors.text};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`;

export const EventImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  position: absolute;
  right: 8px;
  top: 8px;
`;

export const TimeLineContainer = styled.View`
  flex: 1;
`;

export const TimeLineGrid = styled.ScrollView`
  position: relative;
`;

export const TimeLineSlot = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  font-size: 12px;
  margin-left: 0;
`;

export const TimeLine = styled.View`
  background-color: ${colors.background};
  flex: 1;
  height: 1px;
`;

export const TimeLineText = styled.Text`
  background-color: ${colors.backgroundBody};
  margin-left: 26px;
  position: absolute;
  bottom: -8px;
  z-index: 5;
  padding-horizontal: 8px;
  color: ${colors.palette.neutral200};
`;
