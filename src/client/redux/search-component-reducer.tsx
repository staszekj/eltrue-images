import {produce} from "immer";
import {createReducer} from "typesafe-actions";
import {TRootAction} from "./root-action";
import {TSearchCompoment} from '../../common/search-component'
import {searchComponentTypingAction} from '../view/app-actions'

export const initialState: TSearchCompoment = {
    inputString: ""
};

export const searchComponentReducer = createReducer<TSearchCompoment, TRootAction>(
    initialState
).handleAction(searchComponentTypingAction, (state, action) =>
    produce(state, draftState => {
        draftState.inputString = action.payload.inputString
    })
);

