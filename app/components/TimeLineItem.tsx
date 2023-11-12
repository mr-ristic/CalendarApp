import * as React from 'react';
import { TimeLineEvent } from './TimeLineEvent';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { TimeLineContainer, TimeLineGrid, TimeLineSlot, TimeLine, TimeLineText } from './styles';

const halfHourIntervals = Array.from({ length: 48 }, (_, i) => i * 30);

export const TimeLineItem = React.memo(function TimeLineItem({ item }: any) {
  const { events } = item;

  return (
    <TimeLineContainer>
      <TimeLineGrid>
        {halfHourIntervals.map((minutes, index) => {
          const hour = Math.floor(minutes / 60);
          const minute = minutes % 60;
          const isHour = minute === 0;

          return (
            <TimeLineSlot key={index}>
              <TimeLine>{isHour && <TimeLineText>{`${hour}:00`}</TimeLineText>}</TimeLine>
            </TimeLineSlot>
          );
        })}
        {events.map((event: Event) => (
          <TimeLineEvent key={event.id} event={event} />
        ))}
      </TimeLineGrid>
    </TimeLineContainer>
  );
});
