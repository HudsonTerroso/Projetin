const API_URL = "http://localhost:3000/lobinhos";
const listCard = document.querySelector("#listCard");

let paginaAtual = 1;
let termoBusca = "";
let filtrarAdotados = false;

const limite = 4; 
let totalpag = 1;
const pag = document.querySelector(".paginacao");

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
    const totalItens = response.headers.get('X-Total-Count');
    totalpag = Math.ceil(parseInt(totalItens) / limite);
  
    //json dos lobinhos
    const lobinhos = await response.json();
    return lobinhos;
}

function paginacao(){

    pag.innerHTML = "";

    let inicio = paginaAtual - 1;
    let final = paginaAtual + 3;

    if(inicio < 1) inicio = 1;
    if(final > totalpag) final = totalpag;

    if(inicio >= 2){
        const ini = document.createElement("span");
        ini.textContent = `<<<...`;
        ini.classList.add("span");
        ini.addEventListener("click", ()=>{
            paginaAtual = paginaAtual -2;
            inicializarPagina();
        });
        pag.append(ini);
    }

    for(let i= inicio; i <= final; i++){
        const bloco = document.createElement("span");
        bloco.textContent = ` ${i} `;
        bloco.classList.add("span");

        bloco.addEventListener("click", ()=>{
            paginaAtual = i;
            inicializarPagina();
        });

        pag.append(bloco);
    }

    const fim = document.createElement("span");
    fim.textContent = `... >>>`;
    fim.classList.add("span");
    fim.addEventListener("click", ()=>{
        paginaAtual = paginaAtual + 2;
        inicializarPagina();
    });

    pag.append(fim);
}


function criarCardLobinho(lobinhos) {
    listCard.innerHTML = '';
    for (const lobo of lobinhos) {
        const li = document.createElement("li");
        li.className = "listCard";

        if (lobo.adotado) {
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

            listCard.appendChild(li);
        } else {
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

            listCard.appendChild(li);
        }
    }
}

async function inicializarPagina() {
    try {
        const lobinhos = await buscarLobinhos();
        paginacao();
        criarCardLobinho(lobinhos);
    }

    catch (error) {
        console.error("Erro ao carregar os lobinhos:", error);
    }
}

inicializarPagina();


