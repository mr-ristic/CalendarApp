import { Translations } from './en';

const ar: Translations = {
  common: {
    ok: 'نعم',
    cancel: 'حذف',
    back: 'خلف'
  },
  welcomeScreen: {
    postscript:
      'ربما لا يكون هذا هو الشكل الذي يبدو عليه تطبيقك مالم يمنحك المصمم هذه الشاشات وشحنها في هذه الحالة',
    readyForLaunch: 'تطبيقك تقريبا جاهز للتشغيل',
    exciting: 'اوه هذا مثير'
  },
  errorScreen: {
    title: 'هناك خطأ ما',
    friendlySubtitle:
      "هذه هي الشاشة التي سيشاهدها المستخدمون في عملية الانتاج عند حدوث خطأ. سترغب في تخصيص هذه الرسالة ( الموجودة في 'ts.en/i18n/app') وربما التخطيط ايضاً ('app/screens/ErrorScreen'). إذا كنت تريد إزالة هذا بالكامل، تحقق من 'app/app.tsp' من اجل عنصر <ErrorBoundary>.",
    reset: 'اعادة تعيين التطبيق'
  },
  emptyStateComponent: {
    generic: {
      heading: 'فارغة جداً....حزين',
      content: 'لا توجد بيانات حتى الآن. حاول النقر فوق الزر لتحديث التطبيق او اعادة تحميله.',
      button: 'لنحاول هذا مرّة أخرى'
    }
  },
  homeScreen: {
    title: 'Home',
    body: 'Cooming soon!'
  },
  calendarScreen: {
    title: 'Calendar',
    body: 'Cooming soon!',
    cancel: 'Cancel',
    newEventTitle: 'Wanna create a new random event?',
    newEventMessage:
      'This will create a new user and we will once more hack react-native-calendar props to use color prop for user image(participant) ;)',
    newEventBtnText: 'GO GO GO!'
  },
  shopScreen: {
    title: 'Shop',
    body: 'Cooming soon!'
  },
  chatScreen: {
    title: 'Chat',
    body: 'Cooming soon!'
  },
  optionsScreen: {
    title: 'Options',
    body: 'Cooming soon!'
  }
};

export default ar;
