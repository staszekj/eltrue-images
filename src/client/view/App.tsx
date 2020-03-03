import React, {FunctionComponent} from 'react';
import {SearchCompoment} from './search-component'
import {ImagesListComponent} from './images-list-component'
import {useDispatch} from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss'
import {appInitAction} from "./app-actions";

const App: FunctionComponent<{}> = () => {

    const dispatch = useDispatch();
    dispatch(appInitAction());

    return (
        <div className="app">
            <SearchCompoment/>
            <ImagesListComponent />
        </div>
    );
};

export default App;
