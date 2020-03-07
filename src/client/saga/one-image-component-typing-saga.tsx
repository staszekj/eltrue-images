import {ActionType} from "typesafe-actions";
import {call, put, select, delay} from 'redux-saga/effects'
import {oneImageComponentEnterTitleAction, authorUpdateAsyncAction
} from "../view/app-actions";
import {
    IMAGE_INFO_PUT_ENDPOINT_PATH,
} from '../../common/endpoints'
import axios from 'axios';
import {TAuthorUpdateEndpointRequest, TAuthorUpdateEndpointResponse} from "../../common/update-endpoint";

export const httpPutAuthorUpdate = async (request: TAuthorUpdateEndpointRequest) => {
    const serverResponse = await axios.put<TAuthorUpdateEndpointResponse>(IMAGE_INFO_PUT_ENDPOINT_PATH, request);
    return serverResponse.data;
};

export function* oneImageComponentEnterTitleSaga(
    action: ActionType<typeof oneImageComponentEnterTitleAction>
) {
    try {
        const request: TAuthorUpdateEndpointRequest = {
            id: action.payload.id,
            author: action.payload.author
        };
        yield put(
            authorUpdateAsyncAction.request(request)
        );
        const response = yield call(httpPutAuthorUpdate, request);
        yield put(
            authorUpdateAsyncAction.success(response)
        );
    } catch (error) {
        yield put(authorUpdateAsyncAction.failure({}));
    }
}
