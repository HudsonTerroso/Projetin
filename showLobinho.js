const p = document.getElementById("descricao");
const nome = document.getElementById("nome");
const img = document.getElementById("lobo");
const adotar = document.getElementById("adotar");
const excluir = document.getElementById("excluir");


const urlParams = new URLSearchParams(window.location.search);
const idLobo = Number(urlParams.get("id"));

async function buscarLobo() {

    try{
        const response = await fetch(`http://localhost:3000/lobinhos/${idLobo}`);

        if(!response.ok)
            throw new Error('Erro HTTP! Status:' + response.status);


        const lobinho = await response.json();

        nome.textContent = lobinho.nome;
        p.textContent = lobinho.descricao;
        img.src = lobinho.imagem;

    }catch(error){
        alert("Erro ao carregar lobinho" + error);
    }

}

buscarLobo(); //busca as infos do lobo para exibir na tela

async function excluirLobo() {
    try{

        const response = await fetch(`http://localhost:3000/lobinhos/${idLobo}`,{
            method: 'DELETE'
        })

        if(!response.ok){
            throw new Error("Erro HTTP! Status: " + response.status);
        }

        return true;
    }catch(error){
        alert("Erro ao excluir o lobinho" + error);
        throw error;
    }
}

adotar.addEventListener("click", ()=>{
    const novaUrl =`adotarLobinho.html?id=${idLobo}`;
    window.location.href = novaUrl;
})

excluir.addEventListener("click", ()=>{
    const resp = confirm(`Tem certeza que deseja exluir o lobinho? `);
    if(resp){
        excluirLobo();
        window.location.href = `listarLobinhos.html`;
    }

})

