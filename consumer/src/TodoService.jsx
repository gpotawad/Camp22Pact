import Todo from "./Todo";
const axios = require('axios');
import adapter from 'axios/lib/adapters/http';

class TodoService {

    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    createTodo(todo) {
        return axios.post(`${this.baseUrl}/todo`, todo)
            .then(res => {
                console.log(res);
                return res.data;
            })
    };

}

export default TodoService;