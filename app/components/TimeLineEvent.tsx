import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { formatDate } from '../utils/formatDate';
import { EventWrapper, EventTime, EventTitle, EventImage } from './styles';
import { colors } from 'app/theme';

export interface TimeLineEventProps {
  event: Event;
}

const getMinutesFromMidnight = (timeString: string) => {
  const [hours, minutes] = timeString.split(':');
  return parseInt(hours) * 60 + parseInt(minutes);
};

export const TimeLineEvent = observer(function TimeLineEvent({ event }: TimeLineEventProps) {
  const startMinutes = getMinutesFromMidnight(formatDate(event.start, 'HH:mm'));
  const endMinutes = getMinutesFromMidnight(formatDate(event.end, 'HH:mm'));
  const durationMinutes = endMinutes - startMinutes;
  const topPosition = (startMinutes / 30) * 50 + 25; // Adjust top position according to the timeSlot height
  const height = (durationMinutes / 30) * 50; // times height of thhe TimeLine item

  return (
    <EventWrapper $top={topPosition} $height={height}>
      <EventTitle style={{ color: colors.tint }}>{event.title}</EventTitle>
      <EventTime>
        {formatDate(event.start, 'HH:mm')} - {formatDate(event.end, 'HH:mm')}
      </EventTime>
      <EventImage source={{ uri: event.color }} />
    </EventWrapper>
  );
});
