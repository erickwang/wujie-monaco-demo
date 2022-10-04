import * as React from 'react';
import { runApp } from 'ice';
import Loading from './components/Loading';


const appConfig = {
  app: {
    rootId: 'icestark-container',
    addProvider: ({ children }) => (
      <>
        {children}
      </>
    ),
  },
  router: {
    fallback: <Loading />
    // type: 'browser',
  }
};

runApp(appConfig);
