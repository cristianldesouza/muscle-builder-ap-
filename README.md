## rota: localhost:3333/login
body: login, senha
método: post

exemplo body:
{
	"login": "cris",
	"senha": "6019"
}
exemplo retorno:
{
  "mensagem": "Login com sucesso",
  "token": "9db9f7141d582d7e04d76642b1516379"
}

------------------------------------------

## rota: localhost:3333/exercicios/quarta-feira
método: get
header: token

exemplo header *MESMO PARA TODAS AS DEMAIS ROTAS: 
{ 
    "token": "9db9f7141d582d7e04d76642b1516379" 
}

exemplo retorno: 

{
  "dia": "segunda-feira",
  "token": "9db9f7141d582d7e04d76642b1516379",
  "categoria": "Peito",
  "exercicios": [
    "Supino Reto 4x12",
    "Supino Inclinado 4x12",
    "Supino Declinado 4x12",
    "Crussifixo Pack Deck 4x12",
    "Crossover polia 4x20"
  ]
}

------------------------------------------

## rota: localhost:3333/categorias
método: get

exemplo retorno: 

[
  {
    "nome": "Peito"
  },
  {
    "nome": "Costas"
  },
  {
    "nome": "Perna"
  },
  {
    "nome": "Ombro"
  },
  {
    "nome": "Braços"
  }
]

------------------------------------------