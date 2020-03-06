import {createStandardAction, createAsyncAction} from "typesafe-actions";
import {TSearchCompoment} from "../../common/search-component";
import {TSearchEndpointRequest, TSearchEndpointResponse} from "../../common/search-endpoint";
import {TDeleteEndpointRequest, TDeleteEndpointResponse} from "../../common/delete-endpoint";
import {TOneImageComponentReducer} from "../redux/one-image-component-reducer";


export const appInitAction = createStandardAction(
    "app/INIT"
)();

export const searchComponentTypingAction = createStandardAction(
    "search-component/TYPING"
)<Pick<TSearchCompoment, "inputString">>();

export const searchComponentSelectOneImageAction = createStandardAction(
    "search-component/SELECT_ONE_IMAGE"
)<TOneImageComponentReducer>();

export const tileImageComponentDeleteAction = createStandardAction(
    "tile-image-component/DELETE"
)<Pick<TDeleteEndpointRequest, "id">>();

export const fetchImageMeta = createAsyncAction(
    'search-endpoint/REQUEST',
    'search-endpoint/SUCCESS',
    'search-endpoint/FAILURE',
    'search-endpoint/CANCEL'
)<TSearchEndpointRequest, TSearchEndpointResponse, {}, {}>();

export const deleteImage = createAsyncAction(
    'delete-endpoint/REQUEST',
    'delete-endpoint/SUCCESS',
    'delete-endpoint/FAILURE',
    'delete-endpoint/CANCEL'
)<TDeleteEndpointRequest, TDeleteEndpointResponse, {}, {}>();

export const oneImageComponentCloseClickAction = createStandardAction(
    "one-image-component/CLOSE_CLICK"
)();
