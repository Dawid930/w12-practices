const parseJSON = async (url) =>{  //ez azert kellh ne kelljen allandoan beirkalni,,, leszedjuka fetchel az url tartalmat
    const response = await fetch(url)
    return response.json()
}

const userComponent = ({name, surname}) => {  //object destructuringgal van  {} objektumbol kibontjuk a kulcsait
    return `
        <div>
            <h1>${name}</h1>
            <h2>${surname}</h2>
        </div>
    `
}

const loadEvent = async () => {

    const result = await parseJSON('/api/v1/users');
    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML(
        "beforeend", 
        result.map(user => userComponent(user)).join("")) //join h ne legyenek koztuk vesszok, map visszater egz tombbel es ayt joinoljuk egz tombbe, ezt visszaneyni 16:14


};

window.addEventListener("load", loadEvent) //pontosan ugyanolyan a syntactica mint egy app.get stb