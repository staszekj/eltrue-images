import React, {FunctionComponent, useEffect} from 'react';
import {SearchCompoment} from './search-component'
import {ImagesListComponent} from './images-list-component'
import {useDispatch, useSelector} from "react-redux";

import {appInitAction} from "./app-actions";
import {OneImageComponent} from "./one-image-component";
import {getOneImage, getTheme, isOneImageShow} from "./app-selectors";
import {Element} from 'react-scroll';

import './app.scss'
import styled from "styled-components";

const MainVertical = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 20px)
`;

const HeaderStl = styled.div`
    height: 70px;
`;

const MainStl = styled.div`
    flex: 1;
    position: relative;
    background-color: lightgray;
`;

const ScrollContainerStl = styled(Element)`
        position: absolute;
        height: 100%;
        overflow-y: auto;
`;

const FooterContentStl = styled.div`
    padding-top: 10px;
    padding-left: 10px;
    font-size: 10px;
    font-weight: 200;
`;

export const SCROLL_CONTAINER_NAME =  "SCROLL_CONTAINER_NAME";
export const SCROLL_CONTAINER_ID =  "SCROLL_CONTAINER_ID";

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
        <MainVertical>
            <HeaderStl>
                <SearchCompoment/>
            </HeaderStl>
            <MainStl>
                <ScrollContainerStl name={SCROLL_CONTAINER_NAME} id={SCROLL_CONTAINER_ID}>
                    <ImagesListComponent/>
                </ScrollContainerStl>
            </MainStl>
            <FooterContentStl>
                {"Version: 0.0.2"}
            </FooterContentStl>
        </MainVertical>
    )
};

export default App;
