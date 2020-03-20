import React, {FunctionComponent, useEffect} from 'react';
import {SearchCompoment} from './search-component'
import {MainContent} from './main-content'
import {useDispatch, useSelector} from "react-redux";

import {appInitAction} from "./app-actions";
import {OneImageComponent} from "./one-image-component";
import {getOneImage, isOneImageShow} from "./app-selectors";

import './app.scss'

const App: FunctionComponent<{}> = () => {

    const dispatch = useDispatch();
    const oneImage = useSelector(getOneImage);
    const showOneImage = useSelector(isOneImageShow);

    useEffect(() => {
        dispatch(appInitAction());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    if (oneImage && showOneImage) {
        return (
            <OneImageComponent image={oneImage}/>
        )
    }

    return (
        <div>
            <SearchCompoment/>
            <MainContent/>
        </div>
    )
};

export default App;
