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
app.get('/editarClientes/:cpf', (req, res)=>{
    
    let {cpf} = req.params;

    urlListarClientePK = `http://localhost:3000/listarClientePK/${cpf}`;

    // Chamada do axios para a rota do back-end
    axios.get(urlListarClientePK)
        .then((response)=>{
            let clientes = response.data;
            res.render('cliente/editarCliente.ejs', {clientes});

        });

});

app.post('/editarClientes', (req, res)=>{

    let urlEditarCliente = 'http://localhost:3000/alterarCliente';

    axios.put(urlEditarCliente, req.body)
    .then((response)=>{
        res.redirect('/listarCliente');
    });

// Exclusão

    app.get('/excluirClientes/:cpf', (req, res)=>{

        let {cpf} = req.params;
    
        const urlExcluirCliente = `http://localhost:3000/excluirCliente/${cpf}`
    
        axios.delete(urlExcluirCliente)
        .then((response)=>{
            res.redirect('/listarCliente');
        });
    
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
app.get('/editarFabricantes/:id_fabricante', (req, res)=>{
    
    let {id_fabricante} = req.params;

    urlListarFabricantePK = `http://localhost:3000/listarFabricantePK/${id_fabricante}`;

    // Chamada do axios para a rota do back-end
    axios.get(urlListarFabricantePK)
        .then((response)=>{
            let fabricantes = response.data;
            res.render('fabricante/editarFabricante.ejs', {fabricantes});

        });

});

app.post('/editarFabricante', (req, res)=>{

    let urlEditarFabricante = 'http://localhost:3000/alterarFabricante';

    axios.put(urlEditarFabricante, req.body)
    .then((response)=>{
        res.redirect('/listarFabricante');
    });

})

//Exclusão

app.get('/excluirFabricantes/:id_fabricante', (req, res)=>{

    let {id_fabricante} = req.params;

    const urlExcluirFabricante = `http://localhost:3000/excluirFabricante/${id_fabricante}`

    axios.delete(urlExcluirFabricante)
    .then((response)=>{
        res.redirect('/listarFabricante');
    });

});

// -------------------------------------------------------------------------------------------------


app.listen(3001, ()=>{
    console.log("Servidor na porta - http://localhost:3001");
});