import { ValidationSchemaExample } from "../feature/TodoApi/form"
import { TodoList } from "../feature/TodoApi/todoList"

export const HomePage = () => {
    return (
        <>
        <TodoList></TodoList>
        <ValidationSchemaExample></ValidationSchemaExample>
        </>
    )
}