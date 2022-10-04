import { lazy } from 'ice';

import NotFound from './components/NotFound';

const Editor = lazy(() => import('./pages/editor'));

const routes = [
  {
    path: `/`,
    component: Editor
  },
  {
    component: NotFound
  }
];



export default routes;
