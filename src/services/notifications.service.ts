import { toast, ToastOptions } from "react-toastify"

const DEBUG = process.env.NODE_ENV === 'development'

type AlertOptions = Pick<ToastOptions,
    | 'autoClose'
    | 'onClose'
    | 'icon'
>

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
            onClose: options?.onClose,
            autoClose: options?.autoClose ?? 2500,
            icon: options?.icon ?? '✅'
        })
    }

    static info(msg: string, options?: AlertOptions) {
        toast.info(msg, {
            onClose: options?.onClose,
            autoClose: options?.autoClose ?? 2500,
            icon: options?.icon
        })
    }

    static error(msg: string, options?: AlertOptions & Partial<{ error: any }>) {
        if (options?.error && DEBUG) console.log(options?.error)
        toast.error(msg, {
            onClose: options?.onClose,
            autoClose: options?.autoClose ?? 2500,
            icon: options?.icon
        })
    }

}