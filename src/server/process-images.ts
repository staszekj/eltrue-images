import Axios from 'axios';
import json from '../common/images.json'
import path from 'path'
import fs from 'fs'
import jimp from 'jimp'
import _ from 'lodash';
import {calcWidth} from "./calc-width";

const imagesDirPth = path.join(process.cwd(), 'public/images');
const imagesV300DirPth = path.join(process.cwd(), 'public/images-v300');
const imagesV600DirPth = path.join(process.cwd(), 'public/images-v600');

const download = async (downloadUrl: string, imagePth: string) => {
    const url = downloadUrl;
    const writer = fs.createWriteStream(imagePth);

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    })
};

export const downloadImages = async () => {
    if (fs.existsSync(imagesDirPth)) {
        return Promise.resolve();
    }
    fs.mkdirSync(imagesDirPth);
    return Promise.all(_.map(json, (i) => {
        const imagePth = path.join(imagesDirPth, `${i.id}.jpg`);
        return download(i.download_url, imagePth)
    }))
};

export const jimpResize = (sourcePath: string, destPath: string, width: number) => {
    return jimp.read(sourcePath)
        .then((jimpPicture) => {
            return jimpPicture.resize(width, 300).quality(50).write(destPath);
        });
};

export const resize = async () => {
    if (fs.existsSync(imagesV300DirPth)) {
        return Promise.resolve();
    }
    fs.mkdirSync(imagesV300DirPth);
    return Promise.all(_.map(json, (i) => {
        const widthV300 = calcWidth(300, i.width, i.height);
        const sourceImagePth = path.join(imagesDirPth, `${i.id}.jpg`);
        const destImagePth = path.join(imagesV300DirPth, `${i.id}.jpg`);
        return jimpResize(sourceImagePth, destImagePth, widthV300);
    }))
};
