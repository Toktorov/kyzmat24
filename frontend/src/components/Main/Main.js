import React, {useEffect} from 'react';
import Reception from "../Reception/Reception";
import { Route, Switch} from "react-router-dom";
import Home from "../Home/Home";
import Search from "../Search/Search";
import Category from "../Category/Category";
import Reviews from "../Reviews/Reviews";
import Service from "../Service/Service";
import Order from "../Order/Order";
import { useSelector} from "react-redux";
import User from "../User/User";
import Tasks from "../User/components/Tasks/Tasks";
import Orders from "../User/components/Orders/Orders";

const Main = () => {
    const app = useSelector((s)=> s.item.app);

    return (

        <main>
            {
                app === 'kyzmat' ? <Reception/>
                : ''
            }

            <Switch>
                <Route exact path='/' component={() => <Home/>}/>
                <Route exact path='/search' component={() => <Search/>}/>
                <Route exact path='/category' component={() => <Category/>}/>
                <Route exact path='/reviews' component={() => <Reviews/>}/>
                <Route exact path='/service/:id' component={() => <Service/>}/>
                <Route exact path={'/order'} component={() => <Order/>}/>
                <Route path={'/user'} exact component={()=> <User/>}/>
                <Route path={'/user/home/:id'} exact component={()=> <User/>}/>
                <Route exact path={'/user/tasks/'} component={()=> <Tasks/>} />
                <Route exact path={'/user/orders/'} component={() => <Orders/>} />
            </Switch>
        </main>
    );
};

export default Main;