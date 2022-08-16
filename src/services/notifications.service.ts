import { toast, ToastOptions } from "react-toastify"

const DEBUG = process.env.NODE_ENV === 'development'

interface AlertOptions {
    onComplete?: () => void
    autoClose?: number
}

export class NotificationsService {

    static defaultOptions: ToastOptions = {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: 'light',
    }

    static success(msg: string, options?: AlertOptions) {
        toast.success(msg, {
            onClose: options?.onComplete,
            autoClose: options?.autoClose ?? 2500,
            icon: "✅",
            ...options,
        })
    }

    static info(msg: string, options?: AlertOptions) {
        toast.info(msg, {
            onClose: options?.onComplete,
            autoClose: options?.autoClose ?? 2500,
            ...options,
        })
    }

    static warn(msg: string, options?: AlertOptions) {
        toast.warn(msg, {
            onClose: options?.onComplete,
            autoClose: options?.autoClose ?? 2500,
            ...options,
        })
    }

    static error(msg: string, options?: AlertOptions & Partial<{ error: any }>) {
        if (options?.error && DEBUG) console.log(options?.error)
        toast.error(msg, {
            onClose: options?.onComplete,
            autoClose: options?.autoClose ?? 2500,
            ...options,
        })
    }

}