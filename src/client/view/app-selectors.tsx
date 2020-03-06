import {TRootState} from "../redux/root-reducer";
import _ from 'lodash';

export const getSearchComponentInputString = (state: TRootState) => state.searchComponent.inputString;
export const getFoundImages = (state: TRootState) => state.searchEndpoint.response;
export const getFoundImagesLenght = (state: TRootState) => state.searchEndpoint.response.length;


export const isOneImage = (state: TRootState) => !_.isNil(state.oneImageComponent.arrayId);
export const getOneImage = (state: TRootState) => !_.isNil(state.oneImageComponent.arrayId) && getFoundImagesLenght(state) > 0 ?
    getFoundImages(state)[state.oneImageComponent.arrayId % getFoundImagesLenght(state)] : null;
export const getPrevOneImage = (state: TRootState) => state.oneImageComponent.arrayId && getFoundImagesLenght(state) > 0 ?
    getFoundImages(state)[(state.oneImageComponent.arrayId - 1) % getFoundImagesLenght(state)] : null;
export const getNextOneImage = (state: TRootState) => state.oneImageComponent.arrayId && getFoundImagesLenght(state) > 0 ?
    getFoundImages(state)[(state.oneImageComponent.arrayId + 1) % getFoundImagesLenght(state)] : null;
