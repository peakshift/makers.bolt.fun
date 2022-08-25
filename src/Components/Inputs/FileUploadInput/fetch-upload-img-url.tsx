import axios from "axios";
import { NotificationsService } from "src/services";

export async function fetchUploadUrl(options?: Partial<{ filename: string }>) {

    const { filename } = options ?? {}

    try {
        const bodyFormData = new FormData();
        bodyFormData.append('requireSignedURLs', "false");
        const res = await axios({
            url: 'https://cors-anywhere.herokuapp.com/https://api.cloudflare.com/client/v4/accounts/783da4f06e5fdb9012c0632959a6f5b3/images/v2/direct_upload',
            method: 'POST',
            data: bodyFormData,
            headers: {
                "Authorization": "Bearer XXX",
            }
        })
        return res.data.result.uploadURL as string;
    } catch (error) {
        console.log(error);
        NotificationsService.error("A network error happened.")
        return "couldnt fetch upload url";
    }
}