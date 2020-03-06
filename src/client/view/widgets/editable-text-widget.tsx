import React, {FunctionComponent, useState} from "react";
import classnames from "classnames";

import './editable-text-widget.scss'

export interface TEditableTextWidget {
    text: string;
    isEdit: boolean;
    classNames?: string;
    onChange?: (val: string) => void
    onEnter?: () => void
    onTextClick?: () => void
}

export const EditableText: FunctionComponent<TEditableTextWidget> = ({text, isEdit, classNames, onEnter, onTextClick, onChange}) => {
    if (!isEdit) {
        return (
            <span className={classnames("editable-text", classNames)}
                  onClick={() => onTextClick && onTextClick()}>
                {text}
            </span>)
    }

    return (
        <div className={classnames("editable-text", classNames)}>
            <div className={"spinner-wrapper"}>
                <div className={"spinner"}/>
                <input type="text" value={text}
                       onChange={(e) => onChange && onChange(e.target.value)}
                       onKeyUp={(e) => {
                           console.log(e.keyCode);
                           if (e.keyCode === 13) {
                               e.preventDefault();
                               onEnter && onEnter()
                           }
                       }}
                       onBlur={() => onEnter && onEnter()}
                />
            </div>
        </div>
    )
};
