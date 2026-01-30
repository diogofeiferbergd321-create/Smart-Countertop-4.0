

function logar(e){
    e.preventDefault();


    //Busca os inputs do HTML
    let input_usuario = document.getElementById("usuario");
    let input_senha = document.getElementById("senha");

    //Tratamento de erros, caso não tiver esses elementos
    if(!input_usuario || !input_senha){
        return;
    }

    console.log(input_usuario)

    //Se chegou até aqui, conseguiu coletar usuário e senha
    let usuario = input_usuario.value;
    let senha = input_senha.value;

    //Com o usuário e senha, podemos tentar o login
    fetch("http://localhost:1880/autenticacao/autenticar",{
        method:"POST",
        body:JSON.stringify({usuario,senha})
    }).then((resposta)=>{
        console.log(resposta)
        if(resposta.ok){
            resposta.json()
        }
    }).then((usuario)=>{
        alert("Olá, usuario");
    })


}