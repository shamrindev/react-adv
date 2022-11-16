import { Story } from '@storybook/react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';

export const routerDecorator = (Story: Story) => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Story />} />
    </Routes>
  </BrowserRouter>
);
