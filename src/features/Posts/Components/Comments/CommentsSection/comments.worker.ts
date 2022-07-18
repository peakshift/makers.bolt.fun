import dayjs from 'dayjs'

export function now(prefix: string) {
    const hell = window.localStorage.getItem('test');
    if (!hell) window.localStorage.setItem('test', 'test');
    return hell + prefix + dayjs()
}