const data = {
    todos: require("../models/todo.json"),
    setTodos: function(data) {this.todos = data}
}

const getTodos = (req, res) => {
    res.json(data.todos)
};

const postTodo = (req, res) => {
    const newTodo = {
        id: data?.todos?.length ? data.todos[data.todos.length - 1].id + 1 : 1,
        text: req.body.text,
    }

    if (!newTodo.text) {
        return res.status(400).json({"message": "Todo description can not be empty"});
    }

    data.setTodos([...data.todos, newTodo]);
    res.status(201).json(data.todos);
};

const updateTodo = (req, res) => {
    const todo = data.todos.find((todo) => todo.id === parseInt(req.body.id))

    if (!todo) {
        return res.status(400).json({"message": `Todo with id ${req.body.id} is not found`})
    }

    if (req.body.id) todo.id = req.body.id;
    if (req.body.text) todo.text = req.body.text;

    const otherTodos = data.todos.filter((todo) => todo.id !== parseInt(req.body.id));
    const unsortedTodos = [...otherTodos, todo];
    data.setTodos(unsortedTodos.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.todos);
};

const deleteTodo = (req, res) => {
    const todo = data.todos.find(todo => todo.id === parseInt(req.body.id))

    if (!todo) {
        return res.status(400).json({"message": `Todo with id ${req.body.id} is not found`})
    }

    const otherTodos = data.todos.filter((todo) => todo.id !== parseInt(req.body.id));
    data.setTodos(otherTodos);
    res.json(data.todos);
};

const getTodo = (req, res) => {
    const todo = data.todos.find(todo => todo.id === parseInt(req.params.id));

    if (!todo) {
        return res.status(400).json({"message": `Todo with id ${req.params.id} is not found`})
    }
    
    res.json(todo);
};

module.exports = {
getTodos,
postTodo,
updateTodo,
deleteTodo,
getTodo
};