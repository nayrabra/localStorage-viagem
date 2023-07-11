const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
    criaElemento(elemento);
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault(); //addEventListener faz com q ao preencher os campos, os dados escritos são enviados após a ação de clicar no botão “Adicionar”

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const existe = itens.find(elemento => elemento.nome === nome.value);
    console.log(existe);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id;
        atualizaQuantidadeElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }
    console.log(existe);

    localStorage.setItem("itens", JSON.stringify(itens)); //localStorage armazena dados do tipo texto string e, para armazenar objetos, arrays, e listas, é preciso usar o método JSON.stringify()

    nome.value = "";
    quantidade.value = "";
})

function criaElemento(item) {
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem); //appendChild vai inserir um elemento criado dentro do outro
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id)); //// referenciar a função botaoDeleta no nó da função principal

    lista.appendChild(novoItem);
}

function atualizaQuantidadeElemento(item) {
    document.querySelector("[data-id='"+ item.id + "']").innerHTML = item.quantidade;
}

//função para criar botão com evento de click nos itens, e retornar os itens clicados
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    });
    return elementoBotao;
}

//função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador
function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    console.log(itens)

    localStorage.setItem("itens", JSON.stringify(itens));
}
