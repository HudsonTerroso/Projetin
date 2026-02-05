async function adicionarLobinho() {

    const inputNome = document.querySelector("#nome");
    const inputIdade = document.querySelector("#idade");
    const inputFoto = document.querySelector("#foto");
    const inputDescricao = document.querySelector("#descricao");

    if (!inputNome.value || !inputIdade.value || !inputFoto.value || !inputDescricao.value) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const idadeValor = Number(inputIdade.value);
    if (isNaN(idadeValor) || !Number.isInteger(idadeValor) || idadeValor < 0) {
        alert("O campo 'Anos' deve ser um número inteiro válido.");
        return;
    }

    const novoLobinho = {
        nome: inputNome.value,
        idade: idadeValor,
        descricao: inputDescricao.value,
        imagem: inputFoto.value,
        adotado: false,
        nomeDono: null,
        idadeDono: null,
        emailDono: null
    };
    
    try {
        const response = await fetch('http://localhost:3000/lobinhos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoLobinho)
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const criado = await response.json();
        
        alert('Lobinho criado com sucesso!');
        
        inputNome.value = "";
        inputIdade.value = "";
        inputFoto.value = "";
        inputDescricao.value = "";

        console.log('Lobinho criado:', criado);
        return criado;

    } catch (error) {
        console.error('Erro ao criar lobinho:', error);
        alert("Erro ao conectar com o servidor.");
        throw error;
    }
}

document.querySelector(".salvar").addEventListener("click", (e) => {
    e.preventDefault();
    adicionarLobinho();
});