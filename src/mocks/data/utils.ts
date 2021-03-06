import { random, randomItems } from "src/utils/helperFunctions";

let coverImgsCntr = -1;

export function getCoverImage() {
    const coverImgs = [
        'https://picsum.photos/id/10/1600/900',
        'https://picsum.photos/id/1000/1600/900',
        'https://picsum.photos/id/1002/1600/900',
        'https://picsum.photos/id/1018/1600/900',
    ]

    return coverImgs[(++coverImgsCntr) % coverImgs.length]
}
let avatarImgsCntr = -1;

export function getAvatarImage() {
    const avatarImgs = [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3',
        'https://i.pravatar.cc/150?img=4',
    ]

    return avatarImgs[(++avatarImgsCntr) % avatarImgs.length]
};

export function getItems<T>(items: T[], options: { min: number, max: number } | { count: number }) {
    if ('min' in options)
        return randomItems(
            Math.floor(random(options.min, options.max)),
            ...items
        )
    return randomItems(options.count, ...items)
}