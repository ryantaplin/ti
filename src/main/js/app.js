import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './utils/serviceWorker';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import HomePage from './component/page/HomePage.js';
import InvalidPage from './component/page/InvalidPage.js';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="*" component={InvalidPage}/>
        </Switch>
    </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();