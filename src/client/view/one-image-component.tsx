import React, {FunctionComponent, useEffect, useRef, useState} from 'react'
import classnames from 'classnames';
import {MdArrowBack, MdArrowForward, MdClose, MdEdit} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';

import "./one-image-component.scss"
import {TImageMeta} from "../../common/search-endpoint";
import {
    oneImageComponentBackwardClickAction,
    oneImageComponentCloseClickAction,
    oneImageComponentEnterTitleAction,
    oneImageComponentForwardClickAction
} from "./app-actions";
import {getNextArrayId, getPrevArrayId, isAuthorUpdateRequestPending} from "./app-selectors";
import {EditableText} from "./widgets/editable-text-widget";

export interface TOneImageComponentProp {
    image: TImageMeta;
}

export const OneImageComponent: FunctionComponent<TOneImageComponentProp> = ({image}) => {

    const imgRef = useRef<HTMLImageElement>(null);
    const [isAuthorEditMode, setAuthorEditMode] = useState<boolean>(false);
    const [isImageFullyLoaded, setImageFullyLoaded] = useState<boolean>(false);
    const [currentAuthor, setCurrentAuthor] = useState<string>(image.author);
    const [currentTimout, setCurrentTimeout] = useState<ReturnType<typeof setTimeout>|null>(null);
    const [currentId, setCurrentId] = useState<string>(image.id);
    const prevArrayId = useSelector(getPrevArrayId);
    const nextArrayId = useSelector(getNextArrayId);
    const isRequestPending = useSelector(isAuthorUpdateRequestPending);

    const dispatch = useDispatch();
    const onCloseBtnClick = () => dispatch(oneImageComponentCloseClickAction());
    const onForwardBtnClick = () => dispatch(oneImageComponentForwardClickAction({arrayId: nextArrayId}));
    const onPrevBtnClick = () => dispatch(oneImageComponentBackwardClickAction({arrayId: prevArrayId}));

    const swapEditMode = () => {
        setCurrentAuthor(image.author);
        setAuthorEditMode(!isAuthorEditMode)
    };
    const onEnterTitle = () => {
        setAuthorEditMode(false);
        dispatch(oneImageComponentEnterTitleAction({id: image.id, author: currentAuthor}));
    };

    const EditableTextString = isAuthorEditMode || isRequestPending ? currentAuthor : image.author;
    const spinnerEl = !isImageFullyLoaded ? (
        <div className={classnames("spinner-icon")}>
            <div className={"spinner"}/>
        </div>) : null;

    if (currentId !== image.id) {
        setAuthorEditMode(false);
        setImageFullyLoaded(false);
        setCurrentId(image.id);
    }

    useEffect(() => {
        const imageRef = imgRef.current;
        if (imageRef) {
            if (currentTimout) {
                clearTimeout(currentTimout)
            }
            const timer = setTimeout(() => {
                const imageLoader = new Image();
                imageLoader.src = image.downloadUrl;
                imageLoader.onload = () => {
                    if (imageRef.src === image.imageV300Url) {
                        imageRef.src = imageLoader.src;
                        setImageFullyLoaded(true);
                    }
                };
            }, 500);
            setCurrentTimeout(timer);
        }
    }, [image.id]);

    return (
        <div className={"one-image-component"}>
            <div className={"one-image"}>
                <div className={classnames("toolbar")}>
                    <div className={classnames("close-icon")} onClick={() => onCloseBtnClick()}><MdClose/></div>
                    <div className={classnames("edit-icon")} onClick={() => swapEditMode()}><MdEdit/></div>
                    {spinnerEl}
                </div>
                <img ref={imgRef} src={image.imageV300Url} alt={image.author}/>
                <div className={"details"}>
                    <EditableText text={EditableTextString} isInput={isAuthorEditMode || isRequestPending}
                                  isReadOnly={isRequestPending}
                                  isSpinner={isRequestPending}
                                  classNames={classnames("details-content", "title")}
                                  onEnter={onEnterTitle}
                                  onChange={(text) => setCurrentAuthor(text)}
                                  onTextClick={() => swapEditMode()}>
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
