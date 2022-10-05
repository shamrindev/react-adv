import {lazy} from 'react';

const AboutPageAsync = lazy(() => new Promise(resolve => {
  // @ts-ignore
  setTimeout(() => resolve(import('./AboutPage')), 1500)
}));

export default AboutPageAsync;
