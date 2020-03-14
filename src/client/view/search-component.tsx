import React, {ChangeEvent, FunctionComponent} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getSearchComponentInputString} from "./app-selectors";
import {Navbar, Form, FormControl} from 'react-bootstrap'
import classNames from "classnames";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';

import './search-component.scss'
import {searchComponentTypingAction} from "./app-actions";

export const SearchCompoment: FunctionComponent<{}> = () => {
    const dispatch = useDispatch();
    const value = useSelector(getSearchComponentInputString);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchComponentTypingAction({inputString: e.target.value}))
    };

    return (
        <AppBar>
            <Toolbar>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </form>
            </Toolbar>
        </AppBar>
    );

    // return (
            // <Navbar sticky="top" bg={"primary"} variant={"dark"} className={classNames("search-component, justify-content-around")}>
            //     <Navbar.Brand>Eltrue Images</Navbar.Brand>
            //     <Form inline>
            //         <FormControl type="text" placeholder="Search" className=" mr-sm-2" value={value}
            //                      onChange={onChangeHandler}/>
            //     </Form>
            // </Navbar>
    // )
};
