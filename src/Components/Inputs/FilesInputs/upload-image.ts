import axios from "axios";
import { fetchUploadImageUrl } from "src/api/uploading";

export async function uploadImage(file: File) {
    const uploadUrl = await fetchUploadImageUrl({ filename: file.name });
    var bodyFormData = new FormData();
    bodyFormData.append('file', file);
    const res = await axios.post(
        uploadUrl.uploadURL,
        bodyFormData);

    return { src: res.data.result.variants.find((v: string) => v.includes('public')), filename: res.data.result.filename }
}