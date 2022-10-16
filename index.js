const express = require('express');
const { json } = require('express');

const app = express();

app.use(json());

const taskArray = ["Солнце", "Зайка", "Котик"];

app.get('api/all', (req, res) => {
    return res.json({
        tasks: taskArray
    });
})

app.post('api/add', (req, res) => {
    const {text} = req.body;

    if(text) {
        taskArray.push(text);
        return res.json({tasks: taskArray})
    } else {
        return res.status(400).json({message: "bad request"});
    }
})

app.put('api/edit/:number', (req, res) => {
    const {number} = req.params;
    const {text} = req.body;

    if(number && number >= 0 && text) {
        taskArray[number] = text;

        if(taskArray.length-1 > number) {
            return res.status(404).json({message: "item was not found"});
        }

        return res.json({tasks: taskArray});
    } else {
        return res.status(400).json({message: "bad request"});
    }
})

app.delete('api/delete', (req, res) => {
    const {number} = req.params;

    if(number && number > 0) {

        if(taskArray.length-1 > number) {
            return res.status(404).json({message: "item was not found"});
        }

        taskArray.slice(number - 1, 1);
        return res.json({tasks: taskArray})
    } else {
        return res.status(400).json({message: "bad request"});
    }
})

app.listen(5000, () => {
    console.log("🚀 Сервер запущен :) Викуся молодец)");
});
