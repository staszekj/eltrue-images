import {combineReducers} from "redux";

import {searchEndpointReducer} from "./search-endpoint-reducer"
import {searchComponentReducer} from "./search-component-reducer"

import {TSearchEndpoint} from "../../common/search-endpoint"
import {TSearchCompoment} from "../../common/search-component"
import {oneImageComponentReducer, TOneImageComponentReducer} from "./one-image-component-reducer";

export interface TRootState {
    searchEndpoint: TSearchEndpoint,
    searchComponent: TSearchCompoment,
    oneImageComponent: TOneImageComponentReducer
}

export const rootReducer = combineReducers<TRootState>({
    searchEndpoint: searchEndpointReducer,
    searchComponent: searchComponentReducer,
    oneImageComponent: oneImageComponentReducer
});

