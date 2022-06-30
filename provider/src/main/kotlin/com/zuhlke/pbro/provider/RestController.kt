@RestController("/todo")
class MessageController
{
    @GetMapping
    fun index():
            List<Todo> = listOf(
            Todo("1", "Hello!"),
            Todo("2", "Bonjour!"),
            Todo("3", "Privet!"),
    )

    @PostMapping
    fun post(@RequestBody todo: Todo) {
        todo.id=1
        todo
    }
}

data class Todo(val id: Integer, val text: String, val status: String, val category: String)