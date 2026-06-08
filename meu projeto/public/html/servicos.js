// URL da API local do seu Node.js
const API_URL = "http://localhost:3000/api/ordens"; 

carregarOrdensServico()
// OU
const tabelaBody = document.querySelector(".tabela-servico");
    
    if (!tabelaBody) {
        console.error("❌ Erro: A tag <tbody> não foi encontrada na sua tabela.");
        return;
    }

    try {
        console.log("📡 Tentando buscar os dados da API...");
        const resposta = await fetch(API_URL);
        
        if (!response.ok) {
            const statusClass = item.status ? String(item.status).toLowerCase() : "pendente";
        }
        

        const dados = await resposta.json();
        console.log("✅ Dados recebidos do banco:", dados);
        
        
        tabelaBody.innerHTML = "";

        dados.forEach(item => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td><b>${item.numero_os}</b></td>
        <td>${item.cliente}</td>
        <td>${item.equipamento}</td>
        <td><span class="badge-status">${item.status}</span></td>
        <td>${item.data}</td>
        <td>${item.valor}</td>
        <td>
            <button class="btn-acao"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-acao"><i class="fa-solid fa-trash"></i></button>
        </td>
    `;

    tabelaBody.appendChild(linha);
});

    } catch (erro) {
        console.error("❌ Falha ao consumir API de ordens:", erro);
    }


// Executa a função imediatamente ao carregar o arquivo!
carregarOrdensServico();