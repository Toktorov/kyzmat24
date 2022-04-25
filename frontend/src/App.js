import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header";
import "./app.css";
import {Provider} from "react-redux";
import store from "./redux/index";
import Main from "./components/Main/Main";
import UserHeader from "./components/UserHeader/UserHeader";

function App() {

    return (

       <Provider store={store}>
           <div className="App">
               <BrowserRouter>

                   <Switch>
                       <Route path={'/'} exact component={()=>    <Header />}/>
                       <Route path={'/category'} exact component={()=>    <Header />}/>
                       <Route path={'/search'} exact component={()=>    <Header />}/>
                       <Route path={'/reviews'} exact component={()=>    <Header />}/>
                       <Route path={'/order'} exact component={()=>    <Header />}/>
                       <Route path={'/profile/:id'} exact component={()=>    <Header />}/>
                       <Route path={'/user'} exact component={()=> <UserHeader/>}/>
                       <Route path={'/user/home/:id'} exact component={()=> <UserHeader/>}/>
                       <Route path={'/user/tasks'} exact component={()=> <UserHeader/>}/>
                       <Route path={'/user/orders'} exact component={()=> <UserHeader/>}/>
                   </Switch>
                   <Main />
               </BrowserRouter>
           </div>
       </Provider>


    );
}

export default App;
