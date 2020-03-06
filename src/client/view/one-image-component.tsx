import React, {FunctionComponent, useEffect, useRef, useState} from 'react'
import classnames from 'classnames';
import {MdArrowBack, MdArrowForward, MdClose, MdDelete, MdEdit} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';

import "./one-image-component.scss"
import {TImageMeta} from "../../common/search-endpoint";
import {
    oneImageComponentBackwardClickAction,
    oneImageComponentCloseClickAction,
    oneImageComponentEnterTitleAction,
    oneImageComponentForwardClickAction
} from "./app-actions";
import {getNextArrayId, getPrevArrayId} from "./app-selectors";
import {EditableText} from "./widgets/editable-text-widget";

export interface TOneImageComponentProp {
    image: TImageMeta;
}

export const OneImageComponent: FunctionComponent<TOneImageComponentProp> = ({image}) => {

    const [isAuthorEditMode, setAuthorEditMode] = useState<boolean>(true);
    const [currentAuthor, setCurrentAuthor] = useState<string>(image.author);
    const prevArrayId = useSelector(getPrevArrayId);
    const nextArrayId = useSelector(getNextArrayId);
    const dispatch = useDispatch();

    const onCloseBtnClick = () => dispatch(oneImageComponentCloseClickAction());
    const onForwardBtnClick = () => dispatch(oneImageComponentForwardClickAction({arrayId: nextArrayId}));
    const onPrevBtnClick = () => dispatch(oneImageComponentBackwardClickAction({arrayId: prevArrayId}));
    const onEditBtnClick = () => {
        setAuthorEditMode(true)
    };
    const onEnterTitle = () => {
        setAuthorEditMode(false);
        dispatch(oneImageComponentEnterTitleAction({id: image.id, author: currentAuthor}));
    };

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
                    <div className={classnames("edit-icon")} onClick={onEditBtnClick}><MdEdit/></div>
                    <div className={classnames("delete-icon")} onClick={onCloseBtnClick}><MdDelete/></div>
                </div>
                <img ref={imgRef} src={image.imageV300Url}/>
                <div className={"details"}>
                    <EditableText text={currentAuthor} isEdit={isAuthorEditMode}
                                  classNames={classnames("details-content", "title")}
                                  onEnter={onEnterTitle}
                                  onChange={(text) => setCurrentAuthor(text)}
                                  onTextClick={() => setAuthorEditMode(true)}>
                    </EditableText>
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
