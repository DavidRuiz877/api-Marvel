const privateKey = "650f013c17d8c454e6986d1a537fc4b6a07e13d6",
        publicKey = "06ed6228acd491254733dab163f9e197",
        content = document.getElementById("content"),
        search = document.getElementById("search");



const getConnection = () =>{
    const ts = Date.now(),
            hash = MD5(ts + privateKey + publicKey),
            URL = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash} `;
            fetch(URL)
                .then(response => response.json())
                .then(response => {
                 //   console.log(response)
                    response.data.results.forEach(e =>{
                        drawHero(e);
                    });
                })
                .catch(e => console.log(e));
};

const drawHero = e => {
const img = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
const hero = `
    <div class="hero ed-item l-1-3">  
        <h3>${e.name}</h3>
        <div class="hero-img">
        <img class="thumbnail" src="${img}"></img>
        <p class="description">${e.description}</p>
        </div>
    </div>
`;
content.insertAdjacentHTML("beforeend", hero);
};

const searchHero = name =>{
    const ts = Date.now(),
            hash = MD5(ts + privateKey + publicKey),
            hero = encodeURIComponent(name),
            URL = `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
            fetch(URL)
            .then(response => response.json())
            .then(response => {
                response.data.results.forEach(e =>{
                    drawHero(e);
                });
            })
            .catch(e => console.log(e));
};
    
  search.addEventListener("keyup", e => {
    if (e.KeyCode === 13) {
        content.innerHTML = "";
        searchHero(e.target.value.trim());
    }
});
getConnection();