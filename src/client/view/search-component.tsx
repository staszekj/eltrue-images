import React, {ChangeEvent, FunctionComponent} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getSearchComponentInputString} from "./app-selectors";
import {Navbar, Form, InputGroup, FormControl, Button} from 'react-bootstrap'
import classNames from "classnames";

import './search-component.scss'
import {searchComponentTypingAction} from "./app-actions";

export const SearchCompoment: FunctionComponent<{}> = () => {
    const dispatch = useDispatch();
    const value = useSelector(getSearchComponentInputString);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchComponentTypingAction({inputString: e.target.value}))
    };

    return (
            <Navbar sticky="top" bg={"primary"} variant={"dark"} className={classNames("search-component, justify-content-around")}>
                <Navbar.Brand>Eltrue Images</Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className=" mr-sm-2" value={value}
                                 onChange={onChangeHandler}/>
                </Form>
            </Navbar>
    )
};
