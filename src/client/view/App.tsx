import React, {FunctionComponent, useEffect, useState} from 'react';
import {SearchCompoment} from './search-component'
import {ImagesListComponent} from './images-list-component'
import {useDispatch, useSelector} from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import {appInitAction} from "./app-actions";
import {OneImageComponent} from "./one-image-component";
import {getOneImage, isOneImage} from "./app-selectors";

import './app.scss'

const App: FunctionComponent<{}> = () => {

    const dispatch = useDispatch();
    const isOneImageComponent = useSelector(isOneImage);

    useEffect(() => {
        dispatch(appInitAction());
    }, []);


    if (isOneImageComponent) {
        return (
            <OneImageComponent/>
        )
    }

    return (
        <div>
            <SearchCompoment/>
            <ImagesListComponent/>
        </div>
    )
};

export default App;
