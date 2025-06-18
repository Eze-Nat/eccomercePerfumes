import { Bounce, toast } from "react-toastify";

const defaultNotificationConfig = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce

}

export const errorNotification = (message, config) => {
    return toast.error(message, {
        ...defaultNotificationConfig,
        ...config
    })
}

export const successNotification = (message, config) => {
    return toast.success(message, {
        ...defaultNotificationConfig,
        ...config
    })
}

export const warningNotification = (message, config) => {
    return toast.warning(message, {
        ...defaultNotificationConfig,
        ...config
    })
}