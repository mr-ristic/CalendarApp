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
