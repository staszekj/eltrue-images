import {EEndpointStatus} from "./endpoints";
import {ParamsDictionary} from 'express-serve-static-core'

export interface TDeleteEndpointRequest extends ParamsDictionary{
    id: string
}
export type TDeleteEndpointResponse = {
    id: string
};

