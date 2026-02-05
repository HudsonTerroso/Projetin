let btnAdotar = document.getElementById("adotar");
let inputNome = document.getElementById("nome");
let inputIdade = document.getElementById("idade");
let inputEmail = document.getElementById("email");

const urlParams = new URLSearchParams(window.location.search);
const idLobo = Number(urlParams.get('id'));


async function buscarLobo() {
    try{

        const response = await fetch(`http://localhost:3000/lobinhos/${idLobo}`);

        if(!response.ok){
            throw new Error (`Erro HTTP! Status: ${response.status}`);
        }

        const lobinho = await response.json();

        const nomeLobo = document.querySelector(".text h1");
        nomeLobo.textContent = `Adote o(a) ${lobinho.nome}`
        const id = document.querySelector(".text p");
        id.textContent = `ID: ${idLobo}`;

        const imgLobo = document.getElementById("lobinho");
        imgLobo.src = lobinho.imagem;


    }catch(error){
        alert("Erro ao carregar o lobinho: " + error);
    }
     
}
buscarLobo(); //busca as infos do lobo para exibir na tela

async function alterarStatus(nome, idade, email) {

    const dadosPais = { 
        adotado: true,
        nomeDono: nome,
        idadeDono:idade,
        emailDono:email
    };

    try{
        const response = await fetch(`http://localhost:3000/lobinhos/${idLobo}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosPais)
        });

        if(!response.ok){
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobo = await response.json();
        window.location.href = `listarLobinhos.html`;
        return lobo;
    }catch(error){
        alert("Erro ao adotar o lobinho: ", error);
    }
}

btnAdotar.addEventListener("click", () =>{

    let nome = inputNome.value;
    let idade = Number(inputIdade.value);
    let email = inputEmail.value;

    if(nome === "" || inputIdade.value === "" || email === ""){
        alert("Por favor, insira todos os campos");
        return;
    }

    if(isNaN(idade) || !Number.isInteger(idade) || idade <= 0 || idade >= 120){
        alert("Por favor, insira uma idade válida");
        return;
    }

    inputNome.value = "";
    inputIdade.value = "";
    inputEmail.value = "";
    
    alterarStatus(nome, idade, email);
})

