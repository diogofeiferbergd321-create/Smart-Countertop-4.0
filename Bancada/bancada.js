window.onload = ()=>{
    polling (5)
}

function polling(segundos){
    setTimeout(()=>{
        console.log('Buscando...')
        buscarDadosBancada() 
        polling(segundos)
    },segundos*1000)
}

function buscarDadosBancada(){
    fetch('http://10.77.244.188:1880/smartsense/estoque')
        .then(res=>res.json())
        .then(data=>{
        console.log(data)   
        })
}





