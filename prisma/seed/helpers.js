function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomItem(args) {
    return args[Math.floor(Math.random() * args.length)];
}

function randomItems(cnt, args) {
    return shuffle(args).slice(0, Math.floor(cnt));
}

function shuffle(_array) {
    let array = [..._array]
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


let coverImgsCntr = -1;

function getCoverImage() {
    const coverImgs = [
        'https://picsum.photos/id/10/1600/900',
        'https://picsum.photos/id/1000/1600/900',
        'https://picsum.photos/id/1002/1600/900',
        'https://picsum.photos/id/1018/1600/900',
    ]

    return coverImgs[(++coverImgsCntr) % coverImgs.length]
}

module.exports = {
    random,
    randomItem,
    randomItems,
    getCoverImage,
}