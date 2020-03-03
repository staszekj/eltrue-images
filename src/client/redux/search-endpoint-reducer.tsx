import {produce} from "immer";
import {createReducer} from "typesafe-actions";
import {TRootAction} from "./root-action";
import {TSearchEndpoint} from "../../common/search-endpoint"
import {EEndpointStatus} from "../../common/endpoints"
import {fetchImageMeta, deleteImage} from "../view/app-actions";
import _ from 'lodash'


export const initialState: TSearchEndpoint = {
    status: EEndpointStatus.INIT,
    request: {
        search: ""
    },
    response: []
};

export const searchEndpointReducer = createReducer<TSearchEndpoint, TRootAction>(
    initialState
)
    .handleAction(fetchImageMeta.request, (state, action) =>
        produce(state, draftState => {
            draftState.request = action.payload
        })
    )
    .handleAction(fetchImageMeta.success, (state, action) =>
        produce(state, draftState => {
            draftState.response = action.payload
        })
    ).handleAction(deleteImage.success, (state, action) =>
        produce(state, draftState => {
            _.remove(draftState.response, {"id": action.payload.id});
        })
    );

