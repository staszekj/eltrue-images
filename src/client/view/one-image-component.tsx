import React, {FunctionComponent} from 'react'
import classnames from 'classnames';
import {MdArrowForward, MdArrowBack, MdClose} from 'react-icons/md';

import {useRef, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import "./one-image-component.scss"
import {TImageMeta} from "../../common/search-endpoint";
import {oneImageComponentCloseClickAction} from "./app-actions";

export interface TOneImageComponentProp {
    image: TImageMeta;
}
export const OneImageComponent: FunctionComponent<TOneImageComponentProp> = ({image}) => {

    const dispatch = useDispatch();
    const onCloseBtnClick = () => dispatch(oneImageComponentCloseClickAction());
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const imgEl = imgRef.current;
        if (imgEl) {
            const img = new Image();
            img.src = image.downloadUrl;
            img.onload = () => {
                imgEl.src = image.downloadUrl;
            };
        }
    });

    return (
        <div className={"one-image-component"}>
            <div className={classnames("close-icon")} onClick={onCloseBtnClick}><MdClose/></div>
            <div className={"one-image"}>
                <img ref={imgRef} src={image.imageV300Url}/>
                <div className={"details"}>
                    <span className={classnames("details-content", "title")}>{"Abc Cde"}</span>
                    <span className={classnames("details-content", "info")}>{"1230 x 456"}</span>
                </div>
                <div className={"right-toolbar"}>
                    <div className={classnames("right-toolbar-content", "icon-1")}><MdArrowForward/></div>
                </div>
                <div className={"left-toolbar"}>
                    <div className={classnames("left-toolbar-content", "icon-1")}><MdArrowBack/></div>
                </div>
            </div>
        </div>
    );
};
