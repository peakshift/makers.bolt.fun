
const DEBUG = process.env.NODE_ENV === 'development'

export class NotificationsService {
    static error(msg: string, options?: Partial<{ error: any }>) {
        if (options?.error && DEBUG) console.log(options?.error)
        alert(msg)
    }
}