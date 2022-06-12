import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header";
import "./app.css";
import Main from "./components/Main/Main";
import UserHeader from "./components/UserHeader/UserHeader";
import {useSelector} from "react-redux";
import Reception from "./components/Reception/Reception";
//import './libs/fontawesome/all.min.css';

function App() {
const app = useSelector(s => s.item.app);

    return (


           <div className="App">

               <BrowserRouter>
                   {
                       app === 'kyzmat'
                           ? <Header/>
                           : <UserHeader/>
                   }
                   <Switch>
                       <Route path={'/'} exact component={()=>    <Reception />}/>
                       <Route path={'/category'} exact component={()=>    <Reception />}/>
                       <Route path={'/search'} exact component={()=>    <Reception />}/>
                       <Route path={'/reviews'} exact component={()=>    <Reception />}/>
                       <Route path={'/order'} exact component={()=>    <Reception />}/>
                       <Route path={'/service/:id'} exact component={()=>    <Reception />}/>
                   </Switch>
                   <Main />
               </BrowserRouter>
           </div>



    );
}

export default App;
