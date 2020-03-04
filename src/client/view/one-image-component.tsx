import React, {FunctionComponent, useState} from 'react'
import classnames from 'classnames';
import {MdDelete, MdZoomOutMap, MdArrowForward, MdArrowBack} from 'react-icons/md';
import {getOneImage, getNextOneImage, getPrevOneImage} from '../view/app-selectors'

import {useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import "./one-image-component.scss"
import {TImageMeta} from "../../common/search-endpoint";


export const OneImageComponent: FunctionComponent<{}> = () => {

    const dispatch = useDispatch();
    const image: TImageMeta | null = useSelector(getOneImage);
    const prevImage: TImageMeta | null = useSelector(getPrevOneImage);
    const nextImage: TImageMeta | null = useSelector(getNextOneImage);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const imgEl = imgRef.current;
        if (imgEl && image) {
            imgEl.src = image.downloadUrl;
            imgEl.style.width = 'auto';
            imgEl.style.height = 'auto';
        }
    });

    return (
        <div className={"one-image-component"}>
            <img ref={imgRef}/>
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
    );
};
