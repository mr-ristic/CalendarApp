const en = {
  common: {
    ok: 'OK!',
    cancel: 'Cancel',
    back: 'Back'
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: 'Your app, almost ready for launch!',
    exciting: '(ohh, this is exciting!)'
  },
  errorScreen: {
    title: 'Something went wrong!',
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: 'RESET APP'
  },
  emptyStateComponent: {
    generic: {
      heading: 'So empty... so sad',
      content: 'No data found yet. Try clicking the button to refresh or reload the app.',
      button: "Let's try this again"
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

export default en;
export type Translations = typeof en;
