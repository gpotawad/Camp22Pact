import TodoService from './TodoService';
import * as Pact from '@pact-foundation/pact';
import Todo from './Todo';

describe('TodoService API', () => {

    const todoService = new TodoService('http://localhost', global.port);

    describe('createTodo()', () => {

        beforeEach((done) => {
            const contentTypeJsonMatcher = Pact.Matchers.term({
                matcher: "application\\/json; *charset=utf-8",
                generate: "application/json; charset=utf-8"
            });

            global.provider.addInteraction({
                state: 'provider allows todo creation',
                uponReceiving: 'a POST request to create a todo',
                withRequest: {
                    method: 'POST',
                    path: '/todo',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': contentTypeJsonMatcher
                    },
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
            todoService.createTodo(new Todo('Get milk', 'pending', 'Groceries'))
                .then(response => {
                    const todo = response.data;
                    expect(todo.id).toEqual(1);
                })
                .then(() => {
                    global.provider.verify()
                        .then(() => done(), error => {
                            done.fail(error)
                        })
                });
        });
    });

});