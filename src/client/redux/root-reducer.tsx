import {combineReducers} from "redux";

import {searchEndpointReducer} from "./search-endpoint-reducer"
import {searchComponentReducer} from "./search-component-reducer"

import {TSearchEndpoint} from "../../common/search-endpoint"
import {TSearchCompoment} from "../../common/search-component"

export interface TRootState {
    searchEndpoint: TSearchEndpoint,
    searchComponent: TSearchCompoment
}

export const rootReducer = combineReducers<TRootState>({
    searchEndpoint: searchEndpointReducer,
    searchComponent: searchComponentReducer
});

