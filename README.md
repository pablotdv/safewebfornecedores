# Introdução
Projeto desenvolvido para o processo seletivo de Programador Sênior para a [safeweb](https://safeweb.com.br/)

# Tecnologias utilizadas
- Visual Studio Community 2017 Versão 15.6.6 [[download](https://www.visualstudio.com/pt-br/downloads/)]
- Visual Studio Code Versão 1.22.2 - Arquitetura x64 [[download](https://code.visualstudio.com/download)]
- Node: >=9.8.0 [[download](https://nodejs.org/en/download/releases/)]
- Angular CLI: 1.7.3 [[instalação](https://cli.angular.io/)]
- Microsoft SQL Server 2017 (RTM) - 14.0.1000.169 (X64)   Aug 22 2017 17:04:49   Copyright (C) 2017 Microsoft Corporation  Developer Edition (64-bit) on Windows 10 Pro 10.0 <X64> (Build 16299: )  [[download](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)]
- OS: Windows 10 Versão 1709

# Baixando o código fonte
- Como abrir o projeto Backend
1. Abrir o CMD (Windows+R)
2. Rodar o comando `git clone https://github.com/pablotdv/safewebfornecedores.git`
3. Ir para a pasta do projeto `cd safewebfornecedores\src`
4. Abrir o projeto backend `start SafewebFornecedores.sln`
5. Abrir o package manager console (`Tools | Nuget Package Manager | Package Manager Console`)
6. Caso necessário, restaurar os pacotes
7. Rodar o comando `Update-Database` 

- Como abrir o Frontend
1. Voltar no CMD no diretório Raiz do projeto (pasta que contém o README.md)
1. Ir para a pasta do projeto `cd src\Frontend\SafewebFornecedores`
2. Rodar o comando `npm install` para instalar as dependências necessárias
3. Abrir o projeto Angular com o VS Code com o comando `code .`
 

# Como rodar o projeto
Com o projeto backend e frontend abertos siga as instruções abaixo:
1. No Visual Studio, clicar na tecla `F5` ou acesse o menu `Debug | Start Debugging`
2. No VS Code, abrir o terminal `Ctrl + '` ou `View | Integrated Terminal`
3. Rodar o comando `ng serve` no terminal do VS Code
4. Abrir no navegador a url http://localhost:4200
- Versão de demonstração publicada em Azure: http://safewebfornecedores.azurewebsites.net/ 

# Login no sistema
- Usuário: administrador@swf.com.br
- Senha: Admin123@
- Perfil: Administradores

# RF01 - Gerenciar cadastro de usuário
1. Acessar o menu `Usuários`
2. Clicar na tecla `+`
3. Preencher os campos obrigatórios
4. Não esquecer de selecionar o Perfil do usuário
5. Clicar em “salvar”
- Edição de usuários: clicar no ícone de edição (imagem de papel e lápis)
- Para editar um usuário, basta clicar no icone de edição (papel com um lapis)
- Exclusão de usuário: clicar no ícone de exclusão (imagem de lixeira)
- Para excluir um usuário, basta clicar no icone de exclução (lixeira)

# RF02 - Gerenciar o cadastro de fornecedores
1. Acessar o menu `Fornecedores`
2. Clicar na tecla `+`
3. Preencher os campos obrigatórios
4. Clicar em “Salvar”
- Edição de fornecedores: clicar no ícone de edição (imagem de papel e lápis)
- Para editar um fornecedor, basta clicar no icone de edição (papel com um lapis)
- Exclusão de fornecedores: clicar no ícone de exclusão (imagem de lixeira) 
- Para excluir um fornecedor, basta clicar no icone de exclução (lixeira)

 

# RF03 - Gerenciar o cadastro de categorias
1. Acessar o menu `Categorias`
2. Clicar na tecla `+`
3. Preencher os campos obrigatórios
4. Clicar em “Salvar”
- Edição de categoria: clicar no ícone de edição (imagem de papel e lápis)
- Para editar um categoria, basta clicar no icone de edição (papel com um lapis)
- Exclusão de fornecedor: clicar no ícone de exclusão (imagem de lixeira)
- Para excluir uma categoria, basta clicar no icone de exclução (lixeira)

# RF04 - Gerenciar cadastro de propostas de fornecedores
1. Acessar o menu `Propostas`
2. Clicar na tecla `+`
3. Preencher os campos obrigatórios
4. Clicar em “Salvar”
- Para editar um proposta, acesse os detalhes da proposta (ícone olho) e clique no editar
- Para excluir um proposta, acesse os detalhes da proposta (ícone olho) e clicar no excluir 

# RF04.01 - Possibilitar o cadastro do arquivo da proposta
1. Acessar o menu `Propostas`
2. Clicar nos detalhes da proposta
3. Ir na aba `PDF`
4. Selecionar um arquivo PDF ou arrastar o mesmo do Windows Explorer
5. Ao final do Upload o arquivo irá aparecer na aba PDF
OBS: Proposta já cadastrada. 

# RF04.02 – Possibilitar análise do arquivo de proposta
1. Acessar o menu `Propostas`
2. Clicar e nos detalhes da proposta
3. Clicar no botão PDF
OBS: proposta já cadastrada e upload do pdf já realizado. 

# RF05 - Gerenciar o status das propostas de fornecedores
1. Acessar o menu `Propostas`
2. Clicar nos detalhes da proposta
3. Para aprovação da proposta clicar no respectivo botão
OBS: proposta já cadastrada

# RF06 - Pesquisar propostas de fornecedores
Estou finalizando 

# RF07 - Manter histórico do status das propostas
1. Acessar o menu `Propostas`
2. Clicar em detalhes da proposta
3. Aba `Histórico`
OBS: Proposta já cadastrada