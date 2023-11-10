import I18n from 'i18n-js';
import { utcToZonedTime, format as tzFormat } from 'date-fns-tz';
// Note the syntax of these imports from the date-fns library.
// If you import with the syntax: import { format } from "date-fns" the ENTIRE library
// will be included in your production bundle (even if you only use one function).
// This is because react-native does not support tree-shaking.
import { addDays, type Locale } from 'date-fns';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import ar from 'date-fns/locale/ar-SA';
import ko from 'date-fns/locale/ko';
import en from 'date-fns/locale/en-US';

type Options = Parameters<typeof format>[2];

const getLocale = (): Locale => {
  const locale = I18n.currentLocale().split('-')[0];
  return locale === 'ar' ? ar : locale === 'ko' ? ko : en;
};

export const formatDate = (date: string, dateFormat?: string, options?: Options) => {
  const locale = getLocale();
  const dateOptions = {
    ...options,
    locale
  };
  return format(parseISO(date), dateFormat ?? 'MMM dd, yyyy', dateOptions);
};

export const formatDateObject = (date: Date, dateFormat?: string) => {
  return format(date, dateFormat ?? 'yyyy-MM-dd');
};

export const convertEventTimesToTimeZone = (
  date: string,
  startTime: string,
  endTime: string,
  fromTimezone: string,
  toTimezone: string
): { convertedDate: string; convertedStartTime: string; convertedEndTime: string } => {
  const startTimestamp = `${date}T${startTime}`;
  const endTimestamp = `${date}T${endTime}`;

  const zonedStartTime = utcToZonedTime(startTimestamp, fromTimezone);
  const zonedEndTime = utcToZonedTime(endTimestamp, fromTimezone);

  const convertedStartTime = tzFormat(zonedStartTime, 'HH:mm', { timeZone: toTimezone });
  const convertedEndTime = tzFormat(zonedEndTime, 'HH:mm', { timeZone: toTimezone });
  const convertedDate = tzFormat(zonedStartTime, 'yyyy-MM-dd', { timeZone: toTimezone });

  return { convertedDate, convertedStartTime, convertedEndTime };
};

export const addDayAndFormatDate = (dateString: string, add: number, dateFormat?: string) => {
  const date = parseISO(dateString);
  const newDate = addDays(date, add);
  return format(newDate, dateFormat ?? 'yyyy-MM-dd');
};
