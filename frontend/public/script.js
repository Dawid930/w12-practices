const parseJSON = async (url) =>{  //ez azert kellh ne kelljen allandoan beirkalni,,, leszedjuka fetchel az url tartalmat
    const response = await fetch(url)
    return response.json()
}

const userComponent = ({firstName, surname}) => {  //object destructuringgal van  {} objektumbol kibontjuk a kulcsait
    return `
        <div>
            <h1>${firstName}</h1>
            <h2>${surname}</h2>
        </div>
    `
}

function addUserComponent() {
    return `
        <div>
            <input type="text" name="firstName" class="firstName" placeholder="First Name">
            <input type="text" name="surname" class="surName" placeholder="Surname">
            <button class="addNew">Send</button>
        </div>
    `
}

const loadEvent = async () => {


    if (window.location.pathname === '/admin/order-view') {
        console.log("Mi most az admin feluleten vagyunk");
    } else {
        console.log("A vasarloi feluelten vagyunk");
    }

    

    const result = await parseJSON('/api/v1/users');
    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML(
        "beforeend", 
        result.map(user => userComponent(user)).join("")) //join h ne legyenek koztuk vesszok, map visszater egy tombbel es azt joinoljuk egy tombbe, ezt visszaneyni 16:14
    
    rootElement.insertAdjacentHTML("afterend", addUserComponent())

    const button = document.querySelector(".addNew")
    const firstName = document.querySelector(".firstName")
    const surname = document.querySelector(".surName")
    
    button.addEventListener("click", e => {
        /* e.preventDefault(); // itt ez nem kell mert nem form */
        const userData = {
            firstName: firstName.value,
            surname: surname.value
        };

        fetch("/users/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'  // akkor kell ha nem form/formdata-ban dolgozunk, itt adjuk meg h milyen contentet kuldunk
            },
            body: JSON.stringify(userData) // JSON formatta alakitja a bekuldott erteketet
        })
        .then(async data => { // resolution itt jon vissza mint data, z mentjuk az user valtozoba. 
            const user = await data.json();  //A .json() a JSON filebol Javascript objectet csinal 
            rootElement.insertAdjacentHTML("beforeend", userComponent(user))
        })
    })
};

window.addEventListener("load", loadEvent) //pontosan ugyanolyan a syntactica mint egy app.get stb