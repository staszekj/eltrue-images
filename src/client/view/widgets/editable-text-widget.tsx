import React, {FunctionComponent, useState} from "react";
import classnames from "classnames";

import './editable-text-widget.scss'

export interface TEditableTextWidget {
    text: string;
    isInput: boolean;
    isReadOnly?: boolean;
    isSpinner?: boolean
    classNames?: string;
    onChange?: (val: string) => void
    onEnter?: () => void
    onTextClick?: () => void
}

export const EditableText: FunctionComponent<TEditableTextWidget> = (props) => {
    const {text, isInput, classNames, onEnter, onTextClick, onChange, isReadOnly=false, isSpinner=false} = props;
    if (!isInput) {
        return (
            <span className={classnames("editable-text", classNames)}
                  onClick={() => onTextClick && onTextClick()}>
                {text}
            </span>)
    }

    const spinnerEl = isSpinner && <div className={"spinner"}/>;

    return (
        <div className={classnames("editable-text", classNames)}>
            <div className={"spinner-wrapper"}>
                {spinnerEl}
                <input type="text"
                       readOnly={isReadOnly}
                       value={text}
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
