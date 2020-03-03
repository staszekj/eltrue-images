import {createStandardAction, createAsyncAction} from "typesafe-actions";
import {TSearchCompoment} from "../../common/search-component";
import {TSearchEndpointRequest, TSearchEndpointResponse} from "../../common/search-endpoint";
import {TDeleteEndpointRequest, TDeleteEndpointResponse} from "../../common/delete-endpoint";


export const appInitAction = createStandardAction(
    "app/INIT"
)();

export const searchComponentTypingAction = createStandardAction(
    "search-component/TYPING"
)<Pick<TSearchCompoment, "inputString">>();

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
