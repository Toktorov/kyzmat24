import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header";
import "./app.css";
import UserHeader from "./components/UserHeader/UserHeader";
import {useSelector} from "react-redux";
import Footer from "./components/Footer/Footer";
import axios from "axios";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Category from "./components/Category/Category";
import Reviews from "./components/Reviews/Reviews";
import Service from "./components/Service/Service";
import Order from "./components/Order/Order";
import User from "./components/User/User";
import EditProfile from "./components/User/components/EditProfile/EditProfile";
import AcceptedOrders from "./components/User/components/AcceptedOrders/AcceptedOrders";
import Orders from "./components/User/components/Orders/Orders";
import ResetPassword from "./components/User/components/ResetPassword/ResetPassword";

function App() {
    const app = useSelector(s => s.item.app);
    const getCsrfToken = () => {
            const start = document.cookie.indexOf('csrftoken=') + 10;
            const end = document.cookie.indexOf(';', start);
            if (end !== -1) {
                return document.cookie.slice(start, end)
            } else {
                return document.cookie.slice(start)
            }

    };

    useEffect(() => {
        console.log(getCsrfToken());
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
                <main>
                    <Switch>
                        <Route exact path='/' component={() => <Home/>}/>
                        <Route exact path='/search' component={() => <Search/>}/>
                        <Route exact path='/category' component={() => <Category/>}/>
                        <Route exact path='/reviews' component={() => <Reviews/>}/>
                        <Route exact path='/service/:id' component={() => <Service/>}/>
                        <Route exact path={'/order'} component={() => <Order/>}/>
                        <Route path={'/user'} exact component={() => <User/>}/>
                        <Route path={'/user/home/:id'} exact component={() => <User/>}/>
                        <Route path={'/user/edit'} exact component={() => <EditProfile/>}/>
                        <Route exact path={'/user/tasks/'} component={() => <AcceptedOrders/>}/>
                        <Route exact path={'/user/orders/'} component={() => <Orders/>}/>
                        <Route exact path={'/user/reset-password/:token'} component={() => <ResetPassword/>} />
                    </Switch>
                </main>
                <Footer/>
            </BrowserRouter>
        </div>


    );
}

export default App;
