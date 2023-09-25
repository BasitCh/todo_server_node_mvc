const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use('/todos', require("./routes/api/todo"))
app.use('*', (req, res) => {
    res.json({"message": "No Page to display"})
});

app.listen(PORT, (req, res) => {
    console.log(`Todo Server listening on ${PORT}`)
});