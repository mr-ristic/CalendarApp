import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { CalendarProvider, ExpandableCalendar, TimelineList } from 'react-native-calendars';
import { Screen, CalendarDay, UserList, TimeLineItem } from 'app/components';
import { MainTabScreenProps } from 'app/navigators/types';
import { colors } from 'app/theme';
import { HeaderText, HeaderWrapper } from './styles';
import { useStores } from 'app/models';
import { formatDate } from 'app/utils/formatDate';

export const CalendarScreen: FC<MainTabScreenProps<'Calendar'>> = observer(
  function CalendarScreen() {
    const {
      calendarStore: {
        selectDate,
        selectedDate,
        getMarkedMap,
        getEvents,
        getUsersList,
        getUsers,
        selectedUser,
        selectUser,
        getEventsMap
      }
    } = useStores();

    useEffect(() => {
      // TODO Add loading state when using real aPi
      getUsers();
      getEvents();
      selectUser(1);
    }, []);

    const calendarHeader = (
      <HeaderWrapper>
        <HeaderText $bold>{formatDate(selectedDate, 'MMMM d')}, </HeaderText>
        <HeaderText>{formatDate(selectedDate, 'yyyy')}</HeaderText>
      </HeaderWrapper>
    );

    const onDayPress = useCallback((dateString: string) => {
      selectDate(dateString);
    }, []);

    const dayComponent = useCallback(
      (props: any) => (
        <CalendarDay key={props.date.dateString} {...props} onDayPress={onDayPress} />
      ),
      [onDayPress]
    );

    const onDateChanged = (date: string) => {
      selectDate(date);
    };

    const marked = useMemo(() => {
      if (!getMarkedMap[selectedDate]) {
        return {
          ...getMarkedMap,
          [selectedDate]: {
            selected: true
          }
        };
      }
      return getMarkedMap;
    }, [getMarkedMap, selectedDate]);

    const customTheme = {
      textDayHeaderFontSize: 12,
      calendarBackground: colors.background
    };

    return (
      <Screen style={$root} preset="fixed" safeAreaEdges={['top']}>
        <CalendarProvider
          date={selectedDate}
          onDateChanged={onDateChanged}
          showTodayButton={false}
          disabledOpacity={0.6}
        >
          <ExpandableCalendar
            hideKnob={true}
            firstDay={1}
            allowShadow={false}
            markedDates={marked}
            markingType="custom"
            dayComponent={dayComponent}
            hideArrows={true}
            customHeaderTitle={calendarHeader}
            theme={customTheme}
          />
          <UserList users={getUsersList} selectedUser={selectedUser} selectUser={selectUser} />
          <TimelineList
            events={getEventsMap}
            renderItem={(props) => <TimeLineItem item={props} />}
            showNowIndicator
            scrollToFirst
            initialTime={{ hour: 9, minutes: 0 }}
          />
        </CalendarProvider>
      </Screen>
    );
  }
);

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.backgroundBody,
  alignItems: 'baseline',
  width: '100%'
};
