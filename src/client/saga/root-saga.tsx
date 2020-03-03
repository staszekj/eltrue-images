import { takeLeading, takeLatest } from "redux-saga/effects";
import {
    searchComponentTypingAction,
    appInitAction,
    tileImageComponentDeleteAction
} from "../view/app-actions";
import {
    appInitSaga,
    searchComponentTypingSaga, tileImageDeleteSaga
} from "./search-component-typing-saga";

export function* rootSaga() {
    yield takeLeading(appInitAction, appInitSaga);
    yield takeLatest(searchComponentTypingAction, searchComponentTypingSaga);
    yield takeLatest(tileImageComponentDeleteAction, tileImageDeleteSaga);
}


