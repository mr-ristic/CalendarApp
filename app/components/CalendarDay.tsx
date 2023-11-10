import * as React from 'react';
import { DayButton, DayButtonText, Notification, NotificationText } from './styles';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { colors } from 'app/theme';

export interface CalendarDayProps {
  date: {
    day: number;
    dateString: string;
  };
  state?: string;
  marking?: MarkingProps;
  onDayPress: (dateString: string) => void;
}

export const CalendarDay = React.memo(({ date, marking, onDayPress }: CalendarDayProps) => {
  const backgroundColor =
    marking && marking.selected
      ? colors.tint
      : marking && marking.today
      ? colors.palette.primary700
      : 'transparent';

  return (
    <DayButton $background={backgroundColor} onPress={() => onDayPress(date.dateString)}>
      {marking && (
        <Notification $selected={Boolean(marking.selected)}>
          {marking.selected && <NotificationText>{marking.activeOpacity}</NotificationText>}
        </Notification>
      )}
      <DayButtonText $marked={Boolean(marking && marking.selected)}>{date.day}</DayButtonText>
    </DayButton>
  );
});

CalendarDay.displayName = 'CalendarDay';
