import Todo from "./Todo";
const axios = require('axios');
import adapter from 'axios/lib/adapters/http';

class TodoService {

    constructor(baseUrl, port){
        this.baseUrl = baseUrl;
        this.port = port;
    }

    createTodo(todo) {
        return axios.request({
            method: 'POST',
            url: `/todo`,
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: todo
        }, adapter);
    };

}

export default TodoService;