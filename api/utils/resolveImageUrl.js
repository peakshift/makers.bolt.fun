function resolveImgObjectToUrl(imgObject) {
    if(imgObject && imgObject.provider === 'external'){
        return imgObject.url;
    }
    else {
        return "TODO";
    }
}

module.exports = resolveImgObjectToUrl;