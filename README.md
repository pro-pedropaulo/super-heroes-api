# Super Heroes API

## Visão Geral

Bem-vindo à Super Heroes API! Este projeto oferece um conjunto robusto de funcionalidades para gerenciamento de super-heróis e usuários. Construído com NodeJS 20.10.0, esta API permite desde operações básicas de CRUD até batalhas épicas entre heróis de diferentes editoras.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instruções para Clonar o Repositório](#instruções-para-clonar-o-repositório)
- [Documentação SWAGGER](#documentação-swagger)
- [Link da API](#link-da-api)
- [Comandos para Rodar o Projeto Localmente](#comandos-para-rodar-o-projeto-localmente)
- [Testes com Postman](#testes-com-postman)
- [Implementações AWS](#implementações-aws)
- [Vídeo de Apresentação do Projeto](#vídeo-de-apresentação-do-projeto)
- [Melhorias Futuras](#melhorias-futuras)

## Tecnologias Utilizadas

para garantir um desempenho otimizado e uma arquitetura bem estruturada, utilizamos as seguintes tecnologias::

- [x] JWT (Gerenciamento de Token para que o sistema possua autenticação)
- [x] Swagger
- [x] TypeORM (ORM para modelagem de Banco de Dados)
- [x] Mongoose
- [x] Request Validators
- [x] ESLint (Ferramenta para manter o código padronizado e evitar erros)
- [x] Express

## Funcionalidades Principais

A Super Heroes API oferece:

- CRUD de Usuários e Super-Heróis - Gerencia informações detalhadas de usuários e super-heróis, incluindo atributos e poderes.
- Batalhas entre Super-Heróis - Organize e execute batalhas entre heróis de diferentes editoras, com cálculo automático de vencedores.
- Autenticação Segura - Proteja suas rotas com JWT, garantindo que apenas usuários autenticados possam acessar funcionalidades críticas.

## Estrutura do Projeto

Para facilitar a manutenção e a escalabilidade, o projeto está organizado em três módulos principais:

users - authentication - superheroes

Cada módulo contém pastas específicas para DTOs, infraestrutura, repositórios e serviços, além de um gerenciamento de rotas bem definido e desacoplado. Todos os endpoints são protegidos por autenticação, exceto a criação de novos usuários.

## Instruções para Clonar o Repositório

## Para obter uma cópia do projeto, execute:

```
git clone https://github.com/pro-pedropaulo/super-heroes-api.git
```

## Documentação SWAGGER

Acesse a documentação completa da API em

```
http://localhost:5555/api/docs/
```

## Link da API

Interaja com a API através da URL:

```
http://localhost:5555/api
```

## Comandos para rodar o projeto localmente

Subir os Containers do Banco de Dados:

```
docker compose up -d
```

Instalar as dependências

```
npm install
```

Rodar as migrations:

```
npm run migration:run
```

Rodar as seeds (popular o banco):

```
npm run seed
```

Para atualizar a documentação:

```
npm run swagger-autogen

```

Para rodar os testes unitários, utilize o comando:

```
npm run test
```

Para executar o projeto:

```
npm run dev
```

## Testes com Postman

para realização dos testes com postman, faça download da collection e do environment

- Download collection: https://drive.google.com/file/d/1joS6In1r2MiFStRikB6n-PuTjqhuAPbb/view?usp=drive_link

- Download environment: https://drive.google.com/file/d/16coW8XWpYaMaQb8u58756INpHluHl_w9/view?usp=drive_link

## Implementações AWS

- AWS S3
  Para manipulação das fotos de perfil dos usuários, conecte-se ao S3 com a seguinte configuração:

```
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});
```

- AWS EC2

1. Acessar o AWS EC2 e criar uma máquina para ser seu servidor;
2. Gere uma chave de acesso. Isso criará um arquivo (.pem) necessário para autenticar o acesso via SSH ao servidor.
3. No seu terminal, configure o SSH utilizando a chave gerada:

```chmod 400 path/to/your-key.pem
ssh -i "path/to/your-key.pem" ec2-user@your-ec2-public-ip
```

4. Após acessar o servidor EC2, instale o Node.js na versão necessária para o projeto:

```
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

```

5. Dentro do servidor, clone o repositório do projeto:

```
git clone https://github.com/pro-pedropaulo/super-heroes-api.git
cd super-heroes-api
```

6. Instale as dependências do projeto:

```
npm install
```

7. O servidor está pronto para rodar o projeto. Execute o projeto:

```
npm start
```

## Video de apresentação do projeto

- Video de apresentação do Projeto disponivel no youtube: https://youtu.be/q_GWzKXeYc4

## Melhorias futuras

- Aumentar a cobertura de testes unitários e de integração
- Expandir a integração com serviços AWS
- Implementar deploy contínuo da aplicação
