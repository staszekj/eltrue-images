import {EEndpointStatus} from "./endpoints";
import {TImageMeta} from "./search-endpoint";

export type TAuthorUpdateEndpointRequest = Pick<TImageMeta, "id" | "author">
export type TAuthorUpdateEndpointResponse = Pick<TImageMeta, "id" | "author">

export interface TAuthorUpdateEndpoint {
    status: EEndpointStatus,
    request: TAuthorUpdateEndpointRequest,
    response: TAuthorUpdateEndpointResponse
}
