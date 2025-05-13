'use strict'

import { getContatos, getContatosPorNome, postContatos} from "./js/contatos.js"

function criarCard(contato){
    const container = document.getElementById("container")
    const card = document.createElement("div")
    card.classList.add("card-contato")
    card.innerHTML = `
    <img src="${contato.foto}" alt="">
    <h2>${contato.nome}</h2>
    <p>${contato.celular}</p>
    `
    container.appendChild(card)
}

async function exibirContatos() {
    const contatos = await getContatos(evento.target.value)
    contatos.forEach(criarCard)
}

async function exibirPesquisa(evento) {
    const container = document.getElementById("container")

    if(evento.key == 'Enter'){
        const contatos = await getContatosPorNome(evento.target.value)
        container.replaceChildren()
        contatos.forEach (criarCard)
    }
}

function novoContato(){
    document.querySelector('main').className = 'form-show'
}

function voltarHome(){
    document.querySelector('main').className = 'card-show'
}
async function salvarContato(){
    const contato = {
        "nome": document.getElementById('nome').value,
        "celular": document.getElementById('celular').value,
        "email": document.getElementById('email').value,
        "endereco": document.getElementById('endereco').value,
        "cidade": document.getElementById('cidade').value
    }
    const fotoInput = document.getElementById('foto')
    if (fotoInput.files.length > 0) {
        const file = fotoInput.files[0]
        const uploadParams = {
            file,
            storageAccount: 'storageimagesfront',
            sasToken: 'sp=racwl&st=2025-05-13T17:39:49Z&se=2025-07-01T01:39:49Z&sv=2024-11-04&sr=c&sig=9p60y93yaq36%2B4jcIQBCj9ae5GMSb5m24p6tAIUnFLE%3D',
            containerName: 'fotos',
        }
        const imageUrl = await uploadImageToAzure(uploadParams)
        contato.foto = imageUrl
    }
    const isSaved = await postContatos(contato)
    if (isSaved) {
        alert('Criado com sucesso!')
        await exibirContatos()
        voltarHome()
    } else {
        alert('Erro ao criar contato')
    }
}

exibirContatos()

document.getElementById('nome-contato')
        .addEventListener('keydown', exibirPesquisa)

document.getElementById('novo-contato')
        .addEventListener('click', novoContato)

document.getElementById('cancelar')
        .addEventListener('click', voltarHome)

document.getElementById('salvar')
        .addEventListener('click', salvarContato)