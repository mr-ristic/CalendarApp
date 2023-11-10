import React, { FC, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import { Screen, CalendarDay, UserList } from 'app/components';
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
        selectUser
      }
    } = useStores();

    useEffect(() => {
      // TODO Add loading state when using real aPi
      getUsers();
      getEvents();
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

    const customTheme = {
      'stylesheet.calendar.header': {
        week: {
          marginTop: 7,
          marginBottom: -4,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }
      },
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
            calendarStyle={{
              paddingBottom: 12
            }}
            hideKnob={true}
            firstDay={1}
            allowShadow={false}
            markedDates={getMarkedMap}
            markingType="custom"
            // Add or override any props for the ExpandableCalendar
            dayComponent={dayComponent}
            hideArrows={true}
            customHeaderTitle={calendarHeader}
            theme={customTheme}
            // disablePan={true}
          />
          <UserList users={getUsersList} selectedUser={selectedUser} selectUser={selectUser} />
        </CalendarProvider>
      </Screen>
    );
  }
);

const $root: ViewStyle = {
  // flex: 1,
  backgroundColor: colors.backgroundBody,
  alignItems: 'baseline',
  width: '100%'
};
