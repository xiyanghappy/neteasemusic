import axios from "axios";
let service = axios.create({
    baseURL:'https://www.yancey.tech',
    timeout:5000,
    withCredentials:true
})
export default service