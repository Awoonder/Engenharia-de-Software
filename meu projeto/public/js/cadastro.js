const modal = document.getElementById("modal-cadastro");
const btnAbrir = document.getElementById("btn-abrir-modal");
const btnFechar = document.querySelector(".fechar-modal");

// Abrir ao clicar no botão
btnAbrir.addEventListener("click", () => {
    modal.style.display = "block";
});

// Fechar ao clicar no X
btnFechar.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fechar se clicar fora da caixa
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};