const express = require('express');
const { json } = require('express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Документация для Вики',
            version: '1.0.0'
        },
    },
    apis: ['./index.js']
}
const swaggerSpec = swaggerJSDocs(options);

const app = express();

app.use(json());

const taskArray = ["Солнце", "Зайка", "Котик"];

app.get('/all', (req, res) => {
    return res.json({
        tasks: taskArray
    });
})

app.post('/add', (req, res) => {
    const {text} = req.body;

    if(text) {
        taskArray.push(text);
        return res.json({tasks: taskArray})
    } else {
        return res.status(400).json({message: "bad request"});
    }
})

app.put('/edit/:number', (req, res) => {
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

app.delete('/delete', (req, res) => {
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
