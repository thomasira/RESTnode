import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

/* for __dirname because not available in module */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.get('/userList', (req, res) => {
    fs.readFile(__dirname + '/user.json', 'utf8', (err, data) => {
        if(err) throw err;
        res.end(data);
    });
});

app.get('/userForm', (req, res) => res.sendFile(__dirname + '/form.html'));

app.get('/form-data', (req, res) => res.sendFile(__dirname + '/form-data.html'));

app.get('/id=:id', (req, res) => {
    fs.readFile(__dirname + '/user.json', 'utf8', (err, data) => {
        if(err) throw err;
        let users = JSON.parse(data);
        let user = users['user' + req.params.id];
        res.end(JSON.stringify(user));
    });
});

app.post('/add-user', (req, res) => {
    fs.readFile(__dirname + '/user.json', 'utf8', (err, data) => {
        if(err) throw err;
        data = JSON.parse(data);
        data['user' + req.body.id] = req.body;

        const returnData = JSON.stringify(data);
        fs.writeFile(__dirname + '/user.json', returnData, err => {
            if(err) throw err;
            console.log('rewrite successful');
        });
    });
});

app.put('/update-user', (req, res) => {
    fs.readFile(__dirname + '/user.json', 'utf8', (err, data) => {
        if(err) throw err;
        data = JSON.parse(data);
        data['user' + req.body.id] = req.body;

        const returnData = JSON.stringify(data);
        fs.writeFile(__dirname + '/user.json', returnData, err => {
            if(err) throw err;
            console.log('rewrite successful');
        });
    });
});

app.delete('/delete-user/:id', (req, res) => {
    fs.readFile(__dirname + '/user.json', 'utf8', (err, data) => {
        if(err) throw err;
        data = JSON.parse(data);
        delete data['user' + req.params.id];

        const returnData = JSON.stringify(data);
        fs.writeFile(__dirname + '/user.json', returnData, err => {
            if(err) throw err;
            console.log('delete successful');
        });
    });
});

/* server config */
const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('App listening', host, port);
});
