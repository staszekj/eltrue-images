import {ActionType} from "typesafe-actions";
import {call, put, select} from 'redux-saga/effects'
import {
    searchComponentTypingAction,
    fetchImageMeta,
    appInitAction,
    tileImageComponentDeleteAction,
    deleteImage
} from "../view/app-actions";
import path from 'path'
import {TSearchEndpointRequest, TSearchEndpointResponse} from "../../common/search-endpoint";
import json from '../../common/images.json'
import {getSearchComponentInputString} from "../view/app-selectors";
import {IMAGE_INFO_DELETE_ENDPOINT_PATH, IMAGE_INFO_SEARCH_ENDPOINT_PATH} from '../../common/endpoints'
import axios from 'axios';
import {TDeleteEndpointRequest, TDeleteEndpointResponse} from "../../common/delete-endpoint";


export const httpFetchImageInfo = async (request: TSearchEndpointRequest) => {
    const serverResponse = await axios.put<TSearchEndpointResponse>(IMAGE_INFO_SEARCH_ENDPOINT_PATH, request)
    return serverResponse.data;
};

export const httpDeleteImageInfo = async (request: TDeleteEndpointRequest) => {
    const serverResponse = await axios.delete<TDeleteEndpointResponse>(IMAGE_INFO_DELETE_ENDPOINT_PATH + '/' + request.id)
    return serverResponse.data;
};

export function* appInitSaga(
    action: ActionType<typeof appInitAction>
) {
    try {
        const request: TSearchEndpointRequest = {
            search: ''
        };
        yield put(
            fetchImageMeta.request(request)
        );
        const data = yield call(httpFetchImageInfo, request);
        yield put(
            fetchImageMeta.success(data)
        );
    } catch (error) {
        yield put(fetchImageMeta.failure({}));
    }
}

export function* searchComponentTypingSaga() {
    try {
        const inputString = yield select(getSearchComponentInputString);
        const request: TSearchEndpointRequest = {
            search: inputString
        };
        yield put(
            fetchImageMeta.request(request)
        );
        const data = yield call(httpFetchImageInfo, request);
        yield put(
            fetchImageMeta.success(data)
        );
    } catch (error) {
        yield put(fetchImageMeta.failure({}));
    }
}

export function* tileImageDeleteSaga(
    action: ActionType<typeof tileImageComponentDeleteAction>
) {
    try {
        const request: TDeleteEndpointRequest = {
            id: action.payload.id
        };
        yield put(
            deleteImage.request(request)
        );
        const response = yield call(httpDeleteImageInfo, request);
        yield put(
            deleteImage.success(response)
        );
    } catch (error) {
        yield put(deleteImage.failure({}));
    }
}
