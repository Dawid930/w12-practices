const { deepStrictEqual } = require('assert');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9000;

app.use(express.json()); // megfelelo esetekben jsonna alakitjaa request odyjat eshozzacsatolja a reqesthez

const fFolder = `${__dirname}/../frontend`

app.get('/', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`)); //itt szolgaljuk ki az index.html
});

app.get('/admin/order-view', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
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

//ezzel lehet kiszedni user ID ra airni es ugy lhet query 
app.get('/api/v1/users-query', (req, res, next) => {
    console.dir(req.query)
    console.log(req.query.apiKey)
    if (req.query.apiKey === "apple") {
        res.sendFile(path.join(`${__dirname}/../frontend/users.json`));
        
    }else {
        res.send("Unauthorized request")
    }


    
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
/* // ezt alakitottuk at lentebb
app.get('/api/v1/users-params/:key', (req, res, next) => {  // ezen a kulcson lehet elerni 
    console.dir(req.params)
    console.log(req.params.key)

    if (req.params.key === "apple") {
        res.send("Azt mondtad alma")
    } else {
        res.send("Ez nem alma")
    }
    

});
 */
const userFile = path.join(`${__dirname}/../frontend/users.json`) // ezt kene berakni lentre

app.get('/api/v1/users-params/:key', (req, res, next) => {  // arra kell figyelni h mi a param mi a query
    console.dir(req.params)
    console.log(req.params.key)
    fs.readFile(userFile, (error, data) => {
        const users = JSON.parse(data) 
        if (req.params.key === "active") {
            res.send(users.filter(user => user.status === "active"))
        } else if (req.params.key === "passive") {
            res.send(users.filter(user => user.status === "passive"))
        } else {
            res.send("Error reading file")
        }
    })
});

/* //eredeti, ezy irtuk at felette egybe berakni a kettot
app.get('/api/v1/users/active', (req, res, next) => {
    fs.readFile(userFile, (error, data) => {
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
    fs.readFile(userFile, (error, data) => {
        if (error) {
            res.send("Error reading file")
        } else {
            const users = JSON.parse(data)
            
            res.send(users.filter(user => user.status === "passive"))
        }
    })
});
 */

app.use('/public', express.static(`${__dirname}/../frontend/public`)); //elso h a frontenden hogy erem el, a masodik pedig az absolut eleresi ut


app.post("/users/new", (req, res) => {
    fs.readFile(`${fFolder}/users.json`, (error, data) => {
        if (error) {
            console.log(error);
            res.send("Error reeading users file")
            
        } else {
            const users = JSON.parse(data);
            console.log(req.body);

            users.push(req.body)

            fs.writeFile(`${fFolder}/users.json`, JSON.stringify(users), error => {  //stringge kell alakitani h tudjunk bele irni
                if (error) {
                    console.log(error);
                    res.send("Error writing users file")
                }
            })
            res.send(req.body)
        }
    })
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})





