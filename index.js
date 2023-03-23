const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Configurações do EJS
app.use(express.static('public'));
app.set('view engine', 'ejs');


// Rota de acesso as páginas EJS
app.get('/', (req, res)=>{
    res.render('index');
});

// ------------------------- INICIO DAS ROTAS DE CLIENTE ---------------------------------

// Cadastramento
app.get('/cliente', (req, res)=>{
    res.render('cliente/cadastrarCliente');
});

// Listagem de cliente
app.get('/listarCliente', (req, res)=>{
   
    // Configuração da requisição back-end via axios

   // Rota do Back-end
    const urlListarCliente = 'http://localhost:3000/listarCliente';

    // Chamada do axios para a rota do back-end
    // Parametros do verbo:
    // 1- Rota
    // 2- .then de tratamento da resposta

    axios.get(urlListarCliente)
    .then((response)=>{
        console.log(response.data);
        let clientes = response.data;
        res.render('cliente/listarCliente', {clientes});

    });
});

//Edição
app.get('/editarCliente/:cpf', (req, res)=>{
    
    let {cpf} = req.params;

    urlListarClientePK = `http://localhost:3000/listarClientePK/${cpf}`;

    // Chamada do axios para a rota do back-end
    axios.get(urlListarClientePK)
        .then((response)=>{
            let cliente = response.data;
            // console.log(categoria.data);
            res.render('cliente/editarCliente.ejs', {cliente});

        });

});

app.post('/editarCliente', (req, res)=>{

    let urlEditar = 'http://localhost:3000/alterarCliente';

    axios.put(urlEditar, req.body)
    .then((response)=>{
        res.send('Os dados foram atualizados');
    });

})

// -------------------------------------------------------------------------------------------------

// ------------------------- INICIO DAS ROTAS DE FABRICANTE ---------------------------------

// Cadastramento
app.get('/fabricante', (req, res)=>{
    res.render('fabricante/cadastrarFabricante');
});

// Listagem de fabricante
app.get('/listarFabricante', (req, res)=>{
   
    // Configuração da requisição back-end via axios

   // Rota do Back-end
    const urlListarFabricante = 'http://localhost:3000/listarFabricante';

    // Chamada do axios para a rota do back-end
    // Parametros do verbo:
    // 1- Rota
    // 2- .then de tratamento da resposta

    axios.get(urlListarFabricante)
    .then((response)=>{
        console.log(response.data);
        let fabricantes = response.data;
        res.render('fabricante/listarFabricante', {fabricantes});

    });
});

//Edição
app.get('/editarFabricante/:id_fabricante', (req, res)=>{
    
    let {id_fabricante} = req.params;

    urlListarFabricantePK = `http://localhost:3000/listarFabricantePK/${id_fabricante}`;

    // Chamada do axios para a rota do back-end
    axios.get(urlListarFabricantePK)
        .then((response)=>{
            let fabricante = response.data;
            // console.log(categoria.data);
            res.render('cliente/editarFabricante.ejs', {fabricante});

        });

});

app.post('/editarFabricante', (req, res)=>{

    let urlEditar = 'http://localhost:3000/alterarFabricante';

    axios.put(urlEditar, req.body)
    .then((response)=>{
        res.send('Os dados foram atualizados');
    });

})

// -------------------------------------------------------------------------------------------------


app.listen(3001, ()=>{
    console.log("Servidor na porta - http://localhost:3001");
});