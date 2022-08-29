
import axios from "axios";
import { CONSTS } from "src/utils";

export async function fetchUploadImageUrl({ filename }: { filename: string }) {
    const res = await axios.post(CONSTS.apiEndpoint + '/upload-image-url', {
        filename
    }, {
        withCredentials: true
    })
    return res.data;
}