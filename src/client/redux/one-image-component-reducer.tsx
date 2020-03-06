import {produce} from "immer";
import {createReducer} from "typesafe-actions";
import {TRootAction} from "./root-action";
import {
    oneImageComponentCloseClickAction, searchComponentPictureClickAction,
    searchComponentSelectOneImageAction,
} from '../view/app-actions'

export interface TOneImageComponentReducer {
    arrayId: number | null;
}

export const initialState: TOneImageComponentReducer = {
    arrayId: null
};

export const oneImageComponentReducer = createReducer<TOneImageComponentReducer, TRootAction>(
    initialState
).handleAction([
    searchComponentSelectOneImageAction,
    searchComponentPictureClickAction],
    (state, action) =>
    produce(state, draftState => {
        draftState.arrayId = action.payload.arrayId
    })
).handleAction(oneImageComponentCloseClickAction, (state, action) =>
    produce(state, draftState => {
        draftState.arrayId = null
    })
);
