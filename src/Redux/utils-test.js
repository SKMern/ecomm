import * as React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './Reducers';

const customRender = (
  ui,
  initiaState = {}
) => {  
  // Wrap the component with Redux Provider and Router
  const store = configureStore({reducer: rootReducer, preloadedState: initiaState})
  const Wrapper = ({ children }) => (
    
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );

  // Render the component with the custom wrapper
  return render(ui, { wrapper: Wrapper });
};

export * from '@testing-library/react'; // Export all the testing library functions

export { customRender as render };
