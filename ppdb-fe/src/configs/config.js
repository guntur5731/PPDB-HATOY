import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
export const BASE_API_DOWNLOAD = "http://testing.smpithatoy.com"
export const BASE_API = "https://ppdb-services.smpithatoy.com/api"
export const BASE_API_IMAGE = "https://ppdb-services.smpithatoy.com"
// export const BASE_API = "http://localhost:8000/api"
// export const BASE_API_IMAGE = "http://localhost:8000"
export const CODE_EXPORT_EXCEL = "hMOyFkfc8jKmu5aJkHmj/A=="
export const CODE_EXPORT_PDF = "Ja4d+F/gHCjcprTMG3ImSA=="
export const CODE_EXPORT_CSV = "V7oI9liYiTE7PqQX7QAVug=="
export const handleAccesstoken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken)
}

export const NAME_COMPANY = "SMP IT Hayatan Thayyibah"

export const getAccesstoken = () => {
    const ACCESS_TOKEN = localStorage.getItem('accessToken')
    return ACCESS_TOKEN
}

export const getUser = () => {
    const user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null
    return user
}

export const headers = {
    headers: {
        Authorization: `Bearer ${getAccesstoken()}`,
        "content-type": "application/json"
    }
}

export const checkError = (error) => {
    const history = useHistory()
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.clear()
        window.location.reload()
        history.push(`process.env.PUBLIC_URL${"/login"}`)
    } else if (error.response && (error.response.data.message)) {
        toast.error(error.response.data.message)
    } else {
        toast.error((error.response && (error.response.data.message)) ? error.response.data.message : "Failed processing data")
    }
}