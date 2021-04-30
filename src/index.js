import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "./store/store";

const store = configureStore(undefined)
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
reportWebVitals();
