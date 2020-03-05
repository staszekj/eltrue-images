import React, {FunctionComponent, useState} from 'react'
import classnames from 'classnames';
import {MdDelete, MdZoomOutMap} from 'react-icons/md';

import {useRef} from 'react';
import {useDispatch} from 'react-redux';

import "./tile-image-component.scss"
import {tileImageComponentDeleteAction} from "./app-actions";
import VisibilitySensor from 'react-visibility-sensor';

export type TTileImageComponentProps = {
    id: string,
    downloadUrl: string,
    width: number,
    height: number,
    title: string,
    info: string,
}

export const TileImageComponent: FunctionComponent<TTileImageComponentProps> = (props) => {

    const dispatch = useDispatch();
    const [isVisible, setVisible] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const {downloadUrl, width, height, title, info, id} = props;
    const onDeleteBtnClick = () => dispatch(tileImageComponentDeleteAction({id}));

    const onVisibleChangeHandler = (isVisible: boolean) => {
        if (isVisible) {
            setVisible(true);
        }
    };

    if (isVisible) {
        const imgEl = imgRef.current;
        if (imgEl) {
            imgEl.src = downloadUrl;
        }
    }


    return (
        <div className={"tile-image-component"}>
            <VisibilitySensor partialVisibility={true} onChange={onVisibleChangeHandler}>
                <div style={{width: width, height: height}}>
                    <img ref={imgRef} alt={title}/>
                </div>
            </VisibilitySensor>
            <div className={"details"}>
                <span className={classnames("details-content", "title")}>{title}</span>
                <span className={classnames("details-content", "info")}>{info}</span>
            </div>
            <div className={"toolbar"}>
                <div className={classnames("toolbar-content", "icon-1")}><MdZoomOutMap/></div>
                <div className={classnames("toolbar-content", "icon-2")} onClick={onDeleteBtnClick}><MdDelete/></div>
            </div>
        </div>
    );
};
