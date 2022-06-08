const { intArg } = require("nexus");
const axios = require("axios");


function hexToUint8Array(hexString) {
    const match = hexString.match(/.{1,2}/g);
    if (match) {
        return new Uint8Array(match.map((byte) => parseInt(byte, 16)));
    }
}

// TODO: generaly validate LNURL responses
// get lnurl params
function getLnurlDetails(lnurl) {
    return axios.get(lnurl);
}

// parse lightning address and return a url that can be
// used in a request
function lightningAddressToLnurl(lightning_address) {
    const [name, domain] = lightning_address.split("@");
    return `https://${domain}/.well-known/lnurlp/${name}`;
}

// when pressing tip or selecting an amount.
// this is used for caching so the frontend doesnt
// have to make an additional http request to get
// the callback url for future visits
async function getLnurlCallbackUrl(lightning_address) {
    return getLnurlDetails(lightningAddressToLnurl(lightning_address)).then(
        (response) => {
            return response.data.callback;
        }
    );
}


async function getPaymetRequestForItem(lightning_address, amount_in_sat) {
    // # NOTE: CACHING LNURL CALLBACK URLS + PARAMETERS
    // LNURL flows have a lot of back and forth and can impact
    // the load time for your application users.
    // You may consider caching the callback url, or resolved
    // parameters but be mindful of this.
    // The LNURL service provider can change the callback url
    // details or the paramters that is returned we must be
    // careful when trying to optimise the amount of
    // requests so be mindful of this when you are storing
    // these items.

    const amount = amount_in_sat * 1000; // msats
    let lnurlCallbackUrl = await getLnurlCallbackUrl(lightning_address);
    return axios
        .get(lnurlCallbackUrl, { params: { amount } })
        .then((prResponse) => {
            console.log(prResponse.data);
            return prResponse.data.pr;
        });
}



const paginationArgs = (args) => {
    const { take = 10, skip = 0 } = args ?? {}
    return {
        take: intArg({ default: take }),
        skip: intArg({ default: skip })
    }
}

const removeNulls = (obj) => {
    let res = {};
    for (const key in obj) {
        if (obj[key] != null) {
            res[key] = obj[key];
        }
    }
    return res
}

module.exports = {
    getPaymetRequestForItem,
    hexToUint8Array,
    lightningAddressToLnurl,
    getLnurlDetails,
    paginationArgs,
    removeNulls
}
