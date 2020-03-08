import {combineReducers} from "redux";

import {searchEndpointReducer, TSearchEndpoint} from "./search-endpoint-reducer"
import {searchComponentReducer} from "./search-component-reducer"

import {TSearchCompoment} from "../../common/search-component"
import {oneImageComponentReducer, TOneImageComponentReducer} from "./one-image-component-reducer";
import {authorUpdateEndpointReducer, TAuthorUpdateEndpoint} from "./author-update-endpoint-reducer";

export interface TRootState {
    searchEndpoint: TSearchEndpoint,
    authorUpdateEndpoint: TAuthorUpdateEndpoint,
    searchComponent: TSearchCompoment,
    oneImageComponent: TOneImageComponentReducer
}

export const rootReducer = combineReducers<TRootState>({
    searchEndpoint: searchEndpointReducer,
    authorUpdateEndpoint: authorUpdateEndpointReducer,
    searchComponent: searchComponentReducer,
    oneImageComponent: oneImageComponentReducer,
});

