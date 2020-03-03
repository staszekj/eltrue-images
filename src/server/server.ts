import express from 'express';
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser';
import {downloadImages, resize} from './process-images'
import {TSearchEndpointRequest, TSearchEndpointResponse} from "../common/search-endpoint";
import _ from "lodash";
import json from "../common/images.json";
import {calcWidth} from "./calc-width";
import {
    PUBLIC_CTX_PATH,
    IMAGE_INFO_SEARCH_ENDPOINT_PATH,
    PUBLIC_IMAGE_V300,
    IMAGE_INFO_DELETE_ENDPOINT_PATH
} from "../common/endpoints"
import {TDeleteEndpointRequest, TDeleteEndpointResponse} from "../common/delete-endpoint";

export const PORT = 8000;
export const app = express();

console.log("Image downloading. Please wait...");
downloadImages()
    .then(() => {
        console.log("Resizing. Please wait...");
    })
    .then(() => {
        return resize()
    })
    .then(() => {
        console.log("SERVER IS READY :-)");
    });

app.use(cors());
app.use(bodyParser.json());
app.use(PUBLIC_CTX_PATH, express.static("public"));
app.use('/', express.static("build"));

app.put<{}, TSearchEndpointResponse, TSearchEndpointRequest>(IMAGE_INFO_SEARCH_ENDPOINT_PATH, (req, res) => {
    const found = _.filter(json, it => _.includes(it.author.toLowerCase(), req.body.search.toLocaleLowerCase()));
    const results = _.map(found, (item => {
        return {
            id: item.id,
            downloadUrl: item.download_url,
            width: item.width,
            height: item.height,
            author: item.author,
            imageV300Url:  path.join(PUBLIC_IMAGE_V300, `${item.id}.jpg`),
            widthV300: calcWidth(300, item.width, item.height)
        }
    }));
    res.send(results)
});

app.delete<TDeleteEndpointRequest, TDeleteEndpointResponse, {}>(IMAGE_INFO_DELETE_ENDPOINT_PATH + '/:id', (req, res) => {
    const id = req.params.id;
    _.remove(json, {"id": id});
    const resB = {id}
    console.log(resB)
    res.send({id})
});

app.listen(PORT);



