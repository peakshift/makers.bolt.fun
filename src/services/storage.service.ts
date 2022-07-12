
export class StorageService<T = any> {
    key: string;

    constructor(key: string) {
        this.key = key;
    }

    set(newValue: T) {
        localStorage.setItem(this.key, JSON.stringify(newValue));
    }

    get() {
        const str = localStorage.getItem(this.key);
        if (!str)
            return null;

        return JSON.parse(str) as T;
    }

    clear() {
        localStorage.removeItem(this.key)
    }
}
