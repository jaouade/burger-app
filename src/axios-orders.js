import axios from "axios";
export default axios.create({
    baseURL: 'https://burger-builder-1995-default-rtdb.firebaseio.com/'
})