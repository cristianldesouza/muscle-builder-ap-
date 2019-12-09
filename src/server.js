const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi'); 
const low = require('lowdb');
const md5 = require('md5');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database/db.json');
const db = low(adapter);

const app = express();

const cris = {
    login: 'cris',
    senha: '6019',
    token: md5('cris'+":"+'6019')
}

db.defaults({ usuario: [cris] }).write();

app.use(bodyParser.json());

// Routes
app.post('/login', async function (req, res) {
    console.log('efetuando login');

    const schema = Joi.object().keys({ 
        login: Joi.string().required(),
        senha: Joi.string().required()
    }); 

    const {error} = Joi.validate(req.body, schema);
    if (error != null){
        return res.status(400).json({ 
            mensagem: 'Requisição inválida'
        });
    }
    
    //obtendo o usuário com pelo login
    const usuario = db.get('usuario')
        .find({ login: req.body.login })
        .value();
    console.log(usuario);
      //verificando se o usuario existe e se a senha condiz com a senha armazenada
      if(!usuario || md5(req.body.login+":"+req.body.senha) != usuario.token ){
        return res.status(403).json({ 
            mensagem: 'Usuário ou senha inválidos'
        });
    }

    return res.status(200).json({ 
        mensagem: 'Login com sucesso',
        nome: usuario.nome,
        token: usuario.token
    });   


});

app.use(function (req, res, next) {
    console.log("Verificando autenticação");

    if(! req.headers.token){
        return res.status(400).json({
            mensagem: 'Token não enviado'
        });
    }
    const usuario = db.get('usuario')
        .find({ token: req.headers.token })
        .value();
    if(!usuario){
        return res.status(403).json({
            mensagem: 'Token inválido'
        });
    }
    req.usuario = usuario;
    next();
});

app.get('/exercs', async function (req, res) {
    let exercicios = await db.get('exercicios').value();
    console.log(exercicios);
    return res.status(200).json({
        data: exercicios
    });
});

app.get('/exercicios/:dia', function (req, res) {
    
    const usuario = req.usuario;
    const dia = req.params.dia;
    console.log(`Obtendo treinos de ${dia}`);

    const exercicios = db.get('treino')
        .find( { dia: dia }, { token: usuario } )
        .value();
    
    console.log(exercicios)
    
    return res.status(200).json(exercicios);
});


app.listen(3333, () => { console.log('Running on 3333') });