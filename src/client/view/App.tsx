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


    if (oneImage) {
        return (
            <OneImageComponent image={oneImage}/>
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
