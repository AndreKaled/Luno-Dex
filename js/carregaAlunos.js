const boxAlunos = document.getElementById('box-aluninhos')
var file

function carregaListaAlunos(){
    firebase.firestore().collection('pokemons-alunos').get().then(snapshot => {
        const alunos = snapshot.docs.map(doc => doc.data())
        criaPokemonAluno(alunos)
    })
}

async function criaPokemonAluno(alunos){
    for(i=0; i<alunos.length; i++){
        var divAluno = document.createElement('div')
        divAluno.className = 'box-aluno'
        
        var divStrings = document.createElement('div')
        var labelNome = document.createElement('label')
        var labelTipo = document.createElement('label')
        var img = document.createElement('img')

        divStrings.className = 'string-lunomon'


        labelNome.className = 'label-titulo-card'

        alunoTal = alunos[i];

        await firebase.storage().ref('imagens-pokemons/' +alunoTal.img).getDownloadURL().then((url) => img.src = url)
        labelNome.innerHTML = alunoTal.nome
        labelTipo.innerHTML = alunoTal.tipos

        
        divStrings.appendChild(labelNome)
        divStrings.appendChild(labelTipo)
        divAluno.appendChild(divStrings)
        divAluno.appendChild(img)

        boxAlunos.appendChild(divAluno)
    }
}

carregaListaAlunos()

const fileInput = document.getElementById("imagem-pokemon");

fileInput.addEventListener("change", selecionaArquivo);

function selecionaArquivo(e){
    file = e.target.files[0]
}

function adicionarPokemon(){
    var nome = document.getElementById('nome').value
    var tipos = document.getElementById('tipo').value
    firebase.firestore().collection('pokemons-alunos').add({}).then((val) =>
        firebase.firestore().collection('pokemons-alunos').doc(val.id).set({
            "nome": nome,
            "tipos": tipos,
            "img": val.id
        }).then(firebase.storage().ref('imagens-pokemons/' +val.id).put(file).then(alert('Upload feito!')))
    )
}

const list = document.getElementById('list')

list.addEventListener('change', busca)

function busca(e){
    var type = list.value.split(',')
    console.log(type)
}

const lista_tipos = document.getElementById('lista-tipos');

async function addTipos(){

    var li = document.createElement('li')
    var box = document.createElement('input')
    var label = document.createElement('label')
    label.innerHTML = await firebase.firestore().collection('pokemons-tipos').get().then(snapshot => {
        const tipos = snapshot.docs.map(doc => doc.data())
        criaPokemonAluno(tipos)
    })
    /** continuar aq */ 
    box.type = "checkbox"


    li.appendChild(box)
    list.appendChild(li)
}