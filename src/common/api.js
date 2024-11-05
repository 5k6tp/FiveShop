import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json' // 更正为 'application/json'
    },
});



apiClient.interceptors.request.use((config=>{return config;}))

apiClient.interceptors.response.use((response)=>{return response.data;})


export default apiClient