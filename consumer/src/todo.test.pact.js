import TodoService from './TodoService';
import * as Pact from '@pact-foundation/pact';
import Todo from './Todo';
//const hostUrl = require('../pact/jest.config.js').testURL;

describe('TodoService API', () => {

    const todoService = new TodoService("http://localhost:8080");

    describe('createTodo()', () => {

        beforeEach((done) => {
            const contentTypeJsonMatcher = Pact.Matchers.term({
                matcher: "application/json",
                generate: "application/json"
            });

            global.provider.addInteraction({
                state: 'provider allows todo creation',
                uponReceiving: 'a POST request to create a todo',
                withRequest: {
                    method: 'POST',
                    path: '/todo',
                    body: new Todo(null, 'Get milk', 'pending', 'Groceries')
                },
                willRespondWith: {
                    status: 201,
                    headers: {
                        'Content-Type': contentTypeJsonMatcher
                    },
                    body: Pact.Matchers.somethingLike(
                        new Todo(1, 'Get milk', 'pending', 'Groceries'))
                }
            }).then(() => done());
        });

        it('sends a request according to contract', (done) => {
            todoService.createTodo(new Todo(null, 'Get milk', 'done', 'Groceries'))
                .then(response => {
                    console.log("__________________response is back _____________")
                    console.log(response);
                    const todo = response;
                    expect(todo.id).toEqual(1);
                })
                .then(() => {
                    console.log("in then block of it")
                    global.provider.verify()
                        .then(() => done(), error => {
                            console.log(error)
                            done.fail(error)
                        })
                });
        });
    });

});