import React, {FunctionComponent} from 'react'
import {useSelector} from 'react-redux'
import {getFoundImages} from './app-selectors'
import _ from 'lodash';
import {TileImageComponent} from "./tile-image-component";

import './images-list-component.scss'
import styled from "styled-components";
import {ImageResolutions} from "./widgets/AppTableOfContents";

const ImageListStl = styled.div`
  padding-top: 64px;
`;

const MainContentStl = styled.div`
 display: flex;
`;

export const MainContent: FunctionComponent<{}> = () => {
    const founded = useSelector(getFoundImages);
    return (
        <MainContentStl>
            <ImageListStl className={"images-list-component"}>
                {_.map(founded, (i, arrayId) => {
                    const title = i.author;
                    const info = `${i.width} x ${i.height}`;
                    return (
                        <TileImageComponent
                            key={i.id}
                            id={i.id}
                            downloadUrl={i.imageV300Url}
                            width={i.widthV300}
                            height={300}
                            title={title}
                            info={info}
                            arrayId={arrayId}
                        />
                    )
                })}
            </ImageListStl>
            <ImageResolutions/>
        </MainContentStl>
    )
};
