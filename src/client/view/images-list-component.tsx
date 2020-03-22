import React, {FunctionComponent, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {getFoundImages, getArrayId} from './app-selectors'
import _ from 'lodash';
import {TileImageComponent} from "./tile-image-component";
import {Element, scroller} from 'react-scroll';

import './images-list-component.scss'
import styled from "styled-components";

const ImageListStl = styled.div`
  padding-top: 64px;
`;

export const ImagesListComponent: FunctionComponent<{}> = () => {
    const founded = useSelector(getFoundImages);
    const arrayId = useSelector(getArrayId);
    const selected = founded[arrayId];
    useEffect(() => {
        if(selected) {
            scroller.scrollTo(selected.id, {offset: -70})
        }
    }, [selected]);
    return (
        <ImageListStl className={"images-list-component"}>
            {_.map(founded, (i, arrayId) => {
                const title = i.author;
                const info = `${i.width} x ${i.height}`;
                return (
                    <Element name={i.id} key={i.id}>
                        <TileImageComponent
                            id={i.id}
                            downloadUrl={i.imageV300Url}
                            width={i.widthV300}
                            height={300}
                            title={title}
                            info={info}
                            arrayId={arrayId}
                        />
                    </Element>
                )
            })}
        </ImageListStl>
    )
};
