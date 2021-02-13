import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import background from './components/App/background.jpg'

ReactDOM.render(
  // <React.StrictMode>
  // <div style={{backgroundImage: `url(${background})`, width:"100%", height:"100%", backgroundRepeat: 'repeat'}}>
    <App />
    // </div>
  // </React.StrictMode>,
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
