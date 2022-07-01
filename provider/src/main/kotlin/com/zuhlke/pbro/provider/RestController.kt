import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController("/todo")
class MessageController

    @PostMapping
    fun post(@RequestBody todo: Todo) {
        todo.id= "1";
        todo
    }


data class Todo(var id: String, val text: String, val status: String, val category: String)