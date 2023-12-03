import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // 추가
import store from './redux/store'; // Redux store 추가
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* Redux Provider 추가 */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
