import {combineReducers} from "redux";

import {searchEndpointReducer} from "./search-endpoint-reducer"
import {searchComponentReducer} from "./search-component-reducer"

import {TSearchEndpoint} from "../../common/search-endpoint"
import {TSearchCompoment} from "../../common/search-component"
import {oneImageComponentReducer, TOneImageComponentReducer} from "./one-image-component-reducer";
import {authorUpdateEndpointReducer} from "./author-update-endpoint-reducer";
import {TAuthorUpdateEndpoint} from "../../common/update-endpoint";

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

