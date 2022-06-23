import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './components/App';
import { ResetStyle, GlobalStyle } from './components/globalStyle'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ResetStyle/>
    <GlobalStyle/>
    <App />
  </Provider>
);
