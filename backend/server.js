const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9000;

app.get('/', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`)); //itt szolgaljuk ki az index.html
});


app.get('/kismacska', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/somefile.json`)); // itt kiszolgaltuk a somefile.json filet a /kismacska url-en
});


app.get('/something', (req, res, next) => {
    console.log('bejott egy request on something endpoint');
    res.send('thank you for your request, this is our resonse for something endpoint')
});


app.get('/api/v1/users', (req, res, next) => {
    console.log('bejott egy request on users endpoint');

    res.sendFile(path.join(`${__dirname}/../frontend/users.json`));

    
/*     const users = [
        {
            name: 'John',
            surname: 'Doe',
            status: 'active'
        },
        {
            name: 'David',
            surname: 'Nyikes',
            status: 'passive'
        }
    ]
    res.send(JSON.stringify(users)) //azert kell h tudja ovlasni stringkent a bongeszo */
});

const userFile = path.join(`${__dirname}/../frontend/users.json`) // ezt kene berakni lentre

app.get('/api/v1/users/active', (req, res, next) => {
    fs.readFile('../frontend/users.json', (error, data) => {
        if (error) {
            res.send("Error reading file")
        } else {
            const users = JSON.parse(data) // ezzel csinal egy js objectet a json stringjeibol
            //const activeUsers = users.filter(user => user.status === "active"); // ezt lehet egy sorba rakni lentebb
            res.send(users.filter(user => user.status === "active"))
        }
    })// eleresi utvonal h mit olvasson be, a masik pedig egy callback
});

app.get('/api/v1/users/passive', (req, res, next) => {
    fs.readFile('../frontend/users.json', (error, data) => {
        if (error) {
            res.send("Error reading file")
        } else {
            const users = JSON.parse(data)
            
            res.send(users.filter(user => user.status === "passive"))
        }
    })
});


app.use('/public', express.static(`${__dirname}/../frontend/public`)); //eso h a frontenden hogy erem el, a masodik pedig az absolut eleresi ut

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})





