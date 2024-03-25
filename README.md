# Gerenciamento Estoque
## Descrição
Este projeto é uma aplicação web para gerenciamento de itens em um estoque. Permite adicionar novos itens, visualizar, editar e remover itens do estoque.

## Tecnologias Utilizadas

Frontend: React
Backend: Node.js com Express
Banco de Dados: PostgreSQL
Docker

##### Instalação e Uso

Pré-requisitos
Node.js instalado globalmente
Docker instalado e em execução

## Passos

Clone este repositório:
```
 git clone https://github.com/decoesp/Gerenciamento-Estoque
```
##### Navegue até o diretório do projeto
 
Instale as dependências do frontend e do backend:
Frontend
```
cd frontend
npm install 
```
Backend
```
cd backend
npm install
```
Inicie o banco de dados PostgreSQL e a aplicação usando Docker:
OBS: Lembre-se de estar na raiz do projeto.
 ```
docker-compose up -d
```
Caso não queira usar dockerna raiz, só precisa fazer esses comandos:
Frontend
```
cd frontend
docker run -dp 127.0.0.1:5173:5173 frontend
```
Backend
```
cd backend
docker run -dp 127.0.0.1:5000:5000 backend
```
Caso não queira usar docker, só precisa fazer esses comandos:
Frontend
```
cd frontend
npm run dev 
```
Backend
```
cd backend
node server.js
```

Acesse o aplicativo em seu navegador através das rotas
+ No frontend: http://localhost:5173/
+ No backend: http://localhost:5000/

#### As rotas para o backend em sua maioria começam com /items ou /stock.
1. Exemplos:
. http://localhost:5000/stock/stock-report
. http://localhost:5000/items

Este README fornece instruções básicas para instalação e uso do sistema de gerenciamento de itens.

