import React, {FunctionComponent, useEffect, useState} from 'react';
import {SearchCompoment} from './search-component'
import {ImagesListComponent} from './images-list-component'
import {useDispatch, useSelector} from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import {appInitAction} from "./app-actions";
import {OneImageComponent} from "./one-image-component";
import {getOneImage} from "./app-selectors";

import './app.scss'

const App: FunctionComponent<{}> = () => {

    const dispatch = useDispatch();
    const oneImage = useSelector(getOneImage);

    useEffect(() => {
        dispatch(appInitAction());
    }, []);


    const searchPanelEl = (
        <div>
            <SearchCompoment/>
            <ImagesListComponent/>
        </div>);

    const oneImageEl = (
        <div className={"center-content"}>
            <OneImageComponent/>
        </div>
    );

    return (
        <div className={"app"}>
            {oneImage ? oneImageEl : searchPanelEl}
        </div>
    )
};

export default App;
