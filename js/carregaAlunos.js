const boxAlunos = document.getElementById('box-aluninhos')
var file

async function carregaListaAlunos(){
    mostraCarregando()
    let alunos
    await firebase.firestore().collection('pokemons-alunos').get().then(snapshot => {
        alunos = snapshot.docs.map(doc => doc.data())
    })
    criaPokemonAluno(alunos)
    console.log("carregou")
}

async function criaPokemonAluno(alunos){
    for(i=0; i<alunos.length; i++){
        alunoTal = alunos[i];
        
        var card = document.createElement('div');
        card.classList.add('card', 'border-dark','text-bg-light', 'mb-3', 'espaco');
        card.style.height = '90%'
      
        const header = document.createElement('div');
        header.classList.add('card-header');
        header.textContent = alunoTal.nome;
        card.appendChild(header);
      
        const body = document.createElement('div');
        body.classList.add('card-body', 'separador-lunomon');
      
        const title = document.createElement('h5');
        title.classList.add('card-title', 'string-lunomon');
        body.appendChild(title);
      
        var img = document.createElement('img');
        var x = await firebase.storage().ref('imagens-pokemons/' +alunoTal.img).getDownloadURL().then((url) => img.src = url)
        img.classList.add('card-text');
        body.appendChild(img);
      
        card.appendChild(body);      

        var labelTipo = []
    
        for(j=0; j<alunoTal.tipos.length; j++){
            labelTipo[j] = document.createElement('label')    
            labelTipo[j].innerHTML = alunoTal.tipos[j];
            title.appendChild(labelTipo[j])
        }

        document.getElementById('box-aluninhos').appendChild(card)
    }
    escondeCarregando()
}

const fileInput = document.getElementById("imagem-pokemon");

fileInput.addEventListener("change", selecionaArquivo);

function selecionaArquivo(e){
    file = e.target.files[0]
}

function adicionarPokemon(){
    if(!checagemTipos()){
        return   
    }
    var nome = document.getElementById('nome').value
    if(!nome){
        alert('escreva o nome do lunomon!')
        return
    }
    if(file == null){
        alert('insira ao menos uma foto que represente-o(a)!')
        return
    }
    
    firebase.firestore().collection('pokemons-alunos').add({}).then((val) =>
        firebase.firestore().collection('pokemons-alunos').doc(val.id).set({
            "nome": nome,
            "tipos": tipos,
            "img": val.id
        }).then(firebase.storage().ref('imagens-pokemons/' +val.id).put(file).then(limpaCampos(),recarregaLunomons()))
    )
}

function recarregaLunomons(){
    document.getElementById('box-aluninhos').innerHTML = ""
    carregaListaAlunos()
}

const lista_tipos = document.getElementById('lista-tipos');

function addTipos(){
    firebase.firestore().collection('pokemons-tipos').get().then(snapshot => {
        const type =snapshot.docs.map(doc => doc.data())
        criaTipos(type)        
    })
}

var todos_tipos = []
async function criaTipos(tipos){
    for(i=0; i<tipos.length; i++){
        var li = document.createElement('li')
        var box = document.createElement('input')
        var label = document.createElement('label')
        
        tipo = tipos[i]
        label.innerHTML = tipo.nome
        box.type = "checkbox"
        box.id = tipo.nome
        box.className = 'form-check-input'
        box.required = true
        todos_tipos.push(tipo.nome)

        box.addEventListener("change", permission)
        li.appendChild(box)
        li.appendChild(label)
        lista_tipos.appendChild(li)  
    } 
}
addTipos()

function permission(e){
    checagemTipos()
}

function limpaRequired(){
    for(i=0;i<todos_tipos.length; i++){
        document.getElementById(todos_tipos[i]).required = false
    }
}

function ativaRequired(){
    for(i=0;i<todos_tipos.length; i++){
        document.getElementById(todos_tipos[i]).required = true
    }
}

var tipos = []
function checagemTipos(){
    for(i=0; i< todos_tipos.length;i++){
        var box = document.getElementById(todos_tipos[i])
        if(tipos.length>2){
            alert("selecione no máximo 2 tipos")
            box.checked = false
            return false;
        }
        if(box.checked){
            if(!tipos.find((tip) => tip == todos_tipos[i]))
                tipos.push(todos_tipos[i])
        }
    }
    if(tipos.length==0){
        alert('escolha pelo menos 1 tipo')
        ativaRequired()
        return false
    }else{
        limpaRequired()
    }
    return true
}

carregaListaAlunos()

function mostraCarregando(){
    document.getElementById("loading").style.display = "flex"
}

function escondeCarregando(){
    document.getElementById("loading").style.display = "none"
}

function limpaCampos(){
    document.getElementById("nome").value = ""
    document.getElementById("imagem-pokemon").value = "";
    file = null
    tipos = []
    desmarcaBox()
}

function desmarcaBox(){
    for(i=0; i<todos_tipos.length; i++)
        document.getElementById(todos_tipos[i]).checked = false
}