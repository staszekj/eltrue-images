import {TRootState} from "../redux/root-reducer";

export const getSearchComponentInputString = (state: TRootState) => state.searchComponent.inputString;
export const getFoundImages = (state: TRootState) => state.searchEndpoint.response;
