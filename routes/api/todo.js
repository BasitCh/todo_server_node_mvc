const express = require("express");
const router = express.Router();
const {getTodos, postTodo, updateTodo, deleteTodo, getTodo} = require("../../controllers/todoController");

router.route('/')
.get(getTodos)
.post(postTodo)
.put(updateTodo)
.delete(deleteTodo);

router.route('/:id')
.get(getTodo);

module.exports = router;