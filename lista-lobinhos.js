const API_URL = "http://localhost:3000/lobinhos";
const listCard = document.querySelector("#listCard");

let paginaAtual = 1;
let termoBusca = "";
let filtrarAdotados = false;

const busca = document.querySelector("#barraDePesquisa");
busca.addEventListener("input", (event) => {
  termoBusca = busca.value;
  paginaAtual = 1;
  inicializarPagina();
});

const filtroAdotados = document.querySelector("#verAdotados");
filtroAdotados.addEventListener("change", (event) => {
  filtrarAdotados = filtroAdotados.checked;
  paginaAtual = 1;
  inicializarPagina();
});

function montarURL() {
  let url = `${API_URL}?_page=${paginaAtual}&_limit=4`;

  if (termoBusca !== "") {
    url += `&nome_like=${termoBusca}`;
  }

  if (filtrarAdotados) {
    url += `&adotado=true`;
  }

  return url;
}

async function buscarLobinhos() {
    const url = montarURL();

    //fetch na api
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    //json dos lobinhos
    const lobinhos = await response.json();
    return lobinhos;
}

function criarCardLobinho(lobinhos) {
    listCard.innerHTML = '';
    for (const lobo of lobinhos) {
        const li = document.createElement("li");
        li.className = "listCard";

        if (lobo.adotado){
            li.innerHTML = `
            <article class="cardLobinho">
                <img class="imagemLobinho" src="${lobo.imagem}" alt="Foto do lobinho ${lobo.nome}">
                <div class="dadosLobinho">
                    <h3 class="h3">${lobo.nome}</h3>
                    <a class="botaoAdotar adotado" href="#">Adotado</a>
                    <p class="idade">Idade: ${lobo.idade} anos</p>
                    <p class="descricaoLista">${lobo.descricao}</p>
                    
                </div>
            </article>
        `;

        listCard.appendChild(li)
        }else{
            li.innerHTML = `
            <article class="cardLobinho">
                <img class="imagemLobinho" src="${lobo.imagem}" alt="Foto do lobinho ${lobo.nome}">
                <div class="dadosLobinho">
                    <h3 class="h3">${lobo.nome}</h3>
                    <a class="botaoAdotar" href="#">Adotar</a>
                    <p class="idade">Idade: ${lobo.idade} anos</p>
                    <p class="descricaoLista">${lobo.descricao}</p>
                    
                </div>
            </article>
        `;

        listCard.appendChild(li)
        }
    }
}

async function inicializarPagina() {
    try {
        const lobinhos = await buscarLobinhos();
        criarCardLobinho(lobinhos);
        //spanPagina.textContent = `Página ${paginaAtual}`;
    }

    catch (error) {
        console.error("Erro ao carregar os lobinhos:", error);
    }
}

inicializarPagina();

