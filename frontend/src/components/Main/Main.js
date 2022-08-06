import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "../Home/Home";
import Search from "../Search/Search";
import Category from "../Category/Category";
import Reviews from "../Reviews/Reviews";
import Service from "../Service/Service";
import Order from "../Order/Order";
import User from "../User/User";
import AcceptedOrders from "../User/components/AcceptedOrders/AcceptedOrders";
import Orders from "../User/components/Orders/Orders";
import ResetPassword from "../User/components/ResetPassword/ResetPassword";
import EditProfile from "../User/components/EditProfile/EditProfile";

const Main = () => {

    return (

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
                <Route exact path={'/user/reset-password/reset/:value/:token'} component={() => <ResetPassword/>} />
            </Switch>
        </main>
    );
};

export default Main;