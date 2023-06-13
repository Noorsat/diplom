import React from 'react';
import './App.css';
import Router from "./router/Router";
import './utils/styles/global.styles.css'
import Footer from "./components/Footer/Footer";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './shared/fonts/fonts.css';

function App() {
    return (
        <Provider store={store}>
            <ToastContainer autoClose={1000}/>
            <div className="App">
                <div className="App__inner">
                    <Router/>
                </div>
                <Footer/>
            </div>
        </Provider>
    );
}

export default App;
