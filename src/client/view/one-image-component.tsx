import React, {FunctionComponent} from 'react'
import classnames from 'classnames';
import {MdArrowForward, MdArrowBack, MdClose, MdEdit, MdDelete} from 'react-icons/md';

import {useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import "./one-image-component.scss"
import {TImageMeta} from "../../common/search-endpoint";
import {
    oneImageComponentBackwardClickAction,
    oneImageComponentCloseClickAction,
    oneImageComponentForwardClickAction
} from "./app-actions";
import {getNextArrayId, getPrevArrayId} from "./app-selectors";

export interface TOneImageComponentProp {
    image: TImageMeta;
}

export const OneImageComponent: FunctionComponent<TOneImageComponentProp> = ({image}) => {

    const prevArrayId = useSelector(getPrevArrayId);
    const nextArrayId = useSelector(getNextArrayId);
    const dispatch = useDispatch();
    const onCloseBtnClick = () => dispatch(oneImageComponentCloseClickAction());
    const onForwardBtnClick = () => dispatch(oneImageComponentForwardClickAction({arrayId: nextArrayId}));
    const onPrevBtnClick = () => dispatch(oneImageComponentBackwardClickAction({arrayId: prevArrayId}));
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const imgEl = imgRef.current;
        if (imgEl) {
            const img = new Image();
            img.src = image.downloadUrl;
            img.onload = () => {
                if (imgEl.src === image.imageV300Url) {
                    imgEl.src = image.downloadUrl;
                }
            };
        }
    });

    return (
        <div className={"one-image-component"}>
            <div className={"one-image"}>
                <div className={classnames("toolbar")}>
                    <div className={classnames("close-icon")} onClick={onCloseBtnClick}><MdClose/></div>
                    <div className={classnames("edit-icon")} onClick={onCloseBtnClick}><MdEdit/></div>
                    <div className={classnames("delete-icon")} onClick={onCloseBtnClick}><MdDelete/></div>
                </div>
                <img ref={imgRef} src={image.imageV300Url}/>
                <div className={"details"}>
                    <span className={classnames("details-content", "title")}>{image.author}</span>
                    <span className={classnames("details-content", "info")}>{`${image.width} x ${image.height}`}</span>
                </div>
                <div className={"right-toolbar"}>
                    <div className={classnames("right-toolbar-content", "icon-1")} onClick={() => onForwardBtnClick()}>
                        <MdArrowForward/></div>
                </div>
                <div className={"left-toolbar"}>
                    <div className={classnames("left-toolbar-content", "icon-1")} onClick={() => onPrevBtnClick()}>
                        <MdArrowBack/></div>
                </div>
            </div>
        </div>
    );
};
