import React, {FunctionComponent} from 'react'
import {useSelector} from 'react-redux'
import {getFoundImages} from './app-selectors'
import _ from 'lodash';
import {TileImageComponent} from "./tile-image-component";

import './images-list-component.scss'

export const ImagesListComponent: FunctionComponent<{}> = () => {
    const founded = useSelector(getFoundImages);
    return (
        <div className={"images-list-component"}>
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
        </div>
    )
};
