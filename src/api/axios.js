import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT
axios.defaults.headers['Content-type'] = 'Application/json'
const AUTH_TOKEN = $cookies.get('AUTH_TOKEN') ?? null
AUTH_TOKEN ? axios.defaults.headers['Authorization'] = `Bearer ${AUTH_TOKEN}` : null


// set configs
axios.interceptors.request.use(function (config) {
    window.spin.setSpinVal(true)
    return config;
}, function (error) {
    window.useMessage.error(error)
    return Promise.reject(error);
});


// request and responses
axios.interceptors.response.use((response) => responseSuccess(response), (error) => responseError(error));

const responseSuccess = (data) => {
    window.spin.setSpinVal(false)
    if (data.status === 200) {
        switch (data.config.type) {
            case 'store':
                window.useMessage.success("Создано успешно")
                break
            case 'update':
                window.useMessage.info("Успешно обновлено")
                break
            case 'destroy':
                window.useMessage.warning("Удалено успешно")
                break
            default:
                break
        }
    }
    return data
}

const responseError = (data) => {
    window.spin.setSpinVal(false)
    console.log(data.response);
    window.useMessage.error(data.response.data.error.message)
    switch (data.response.status) {
        case 500:
            // window.location.href = '/cabinet/error'
            break
        case 401:
            $cookies.remove("token_user")
            localStorage.removeItem('user')
            window.location.href = '/login'
            break
        case 466:
            break
        case 403:
            break
        default:
            break
    }

    return data.response
}


export default axios