import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header";
import "./app.css";
import Main from "./components/Main/Main";
import UserHeader from "./components/UserHeader/UserHeader";
import {useSelector} from "react-redux";
import Reception from "./components/Reception/Reception";
import Footer from "./components/Footer/Footer";
import axios from "axios";

function App() {
    const app = useSelector(s => s.item.app);
    const getCsrfToken = () => {
        const start = document.cookie.match(/csrftoken=/).index + 10;
        const end = document.cookie.indexOf(';', start);
        if (end !== -1){
            return document.cookie.slice(start, end)
        } else {
            return document.cookie.slice(start)
        }
    };

    useEffect(() => {
        axios.defaults.headers.post['X-CSRF-TOKEN'] = getCsrfToken();
    }, []);
    return (


        <div className="App">

            <BrowserRouter>
                {
                    app === 'kyzmat'
                        ? <Header/>
                        : <UserHeader/>
                }
                <Switch>
                    <Route path={'/'} exact component={() => <Reception/>}/>
                    <Route path={'/category'} exact component={() => <Reception/>}/>
                    <Route path={'/search'} exact component={() => <Reception/>}/>
                    <Route path={'/reviews'} exact component={() => <Reception/>}/>
                    <Route path={'/order'} exact component={() => <Reception/>}/>
                    <Route path={'/service/:id'} exact component={() => <Reception/>}/>
                </Switch>
                <Main/>
                <Footer/>
            </BrowserRouter>
        </div>


    );
}

export default App;
