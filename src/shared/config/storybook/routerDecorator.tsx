import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const routerDecorator = (story: () => Story) => (
  <BrowserRouter>
    {story()}
  </BrowserRouter>
);
