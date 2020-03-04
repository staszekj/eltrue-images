import {produce} from "immer";
import {createReducer} from "typesafe-actions";
import {TRootAction} from "./root-action";
import {TSearchCompoment} from '../../common/search-component'
import {searchComponentSelectOneImageAction, searchComponentTypingAction} from '../view/app-actions'

export interface TOneImageComponentReducer {
    arrayId: number | null;
}

export const initialState: TOneImageComponentReducer = {
    arrayId: 500
};

export const oneImageComponentReducer = createReducer<TOneImageComponentReducer, TRootAction>(
    initialState
).handleAction(searchComponentSelectOneImageAction, (state, action) =>
    produce(state, draftState => {
        draftState.arrayId = action.payload.arrayId
    })
);

