# EducaHub

**EducaHub** é uma plataforma voltada para professores e alunos, onde os professores têm acesso a funcionalidades exclusivas para criar, editar e excluir posts. Alunos podem visualizar os posts, mas somente os professores têm permissão para realizar ações administrativas.

A aplicação foi desenvolvida utilizando React para o front-end e está hospedada na Vercel. 

## Funcionalidades

- **Login de professores**: Apenas os professores autenticados podem acessar áreas restritas, como criação, edição e exclusão de posts.
- **Criação de posts**: Professores podem criar posts através de um formulário com campos para título, conteúdo e categoria.
- **Edição de posts**: Professores podem editar postagens existentes.
- **Exclusão de posts**: Professores podem excluir posts que foram criados.
- **Exibição de posts**: Todos os usuários, incluindo alunos, podem visualizar uma lista de posts.
- **Proteção de rotas**: Apenas professores autenticados podem acessar rotas específicas para gerenciamento de posts.


### Descrição das Pastas e Arquivos

- **`assets/`**: Contém todos os arquivos estáticos, como imagens.
- **`components/`**: Componentes reutilizáveis e modulares usados em várias partes da aplicação.
  - **`FilterModal.js`**: Modal para aplicar filtros aos posts.
  - **`Login.js`**: Componente que exibe a página de login para professores.
  - **`Modal.js`**: Modal genérico que pode ser reutilizado em vários contextos.
  - **`ModalPost.js`**: Modal específico para criação e edição de posts.
  - **`Post.js`**: Componente de post individual.
  - **`PostList.js`**: Exibe a lista de posts criados.
  - **`Profile.js`**: Tela de perfil onde o professor pode gerenciar seus posts (criar, editar, excluir).
  - **`ProtectedRoute.js`**: Componente de rota protegida que verifica a autenticação do usuário.
  - **`Toolbar.js`**: Barra de navegação que permite a navegação pelas páginas principais da aplicação.
- **`config/`**: Contém configurações da API, incluindo configurações de autenticação e variáveis de ambiente.
- **`context/`**: Usado para gerenciar o estado global de autenticação com a Context API.
- **`hooks/`**: Contém hooks personalizados que abstraem a lógica reutilizável na aplicação.
- **`App.js`**: O ponto de entrada da aplicação, que organiza as rotas e renderiza os componentes necessários.

## Acesso à Aplicação

A aplicação está hospedada na Vercel e pode ser acessada pelo seguinte link:

[educahub-ui.vercel.app](https://educahub-ui.vercel.app)

### Credenciais de Acesso

Para acessar a aplicação como **professor**, utilize as credenciais abaixo:

- **Email**: `admin@gmail.com`
- **Senha**: `senha@123`

## Funcionalidades de Usuário

### Página de Login

- Professores podem fazer login com suas credenciais.
- Alunos têm acesso ao conteúdo de posts, mas não podem criar, editar ou excluir posts.

### Página Principal

- Exibe a lista de posts publicados.
- Possui uma funcionalidade de filtro para facilitar a busca por posts.

### Página de Perfil

- Somente acessível para professores autenticados.
- Exibe a lista de posts criados pelo usuário logado.
- Permite criar, editar e excluir posts.

### Criação de Posts

- Professores podem criar novos posts através de um modal.
- O post deve conter um título e um conteúdo e uma categoria(matéria).

### Edição de Posts

- Professores podem editar os posts que criaram.
- Modificações podem ser feitas no título e no conteúdo do post e na matéria.

### Exclusão de Posts

- Professores podem excluir posts que criaram.

## Fluxo de Autenticação

A plataforma utiliza um sistema de autenticação com base em **token JWT**. Ao fazer login, o token é armazenado e usado para proteger as rotas que exigem autenticação. O **Profile Page** e as funcionalidades de criação, edição e exclusão de posts são acessíveis apenas para professores autenticados.

## Proteção de Rotas

As rotas para **criação**, **edição** e **exclusão de posts** são protegidas e apenas acessíveis por professores autenticados. A navegação é controlada através do **ProtectedRoute**, que garante que apenas usuários autenticados possam acessar essas áreas.

## Como a aplicação foi estruturada

### Componentes Principais

- **Login.js**: Tela de login onde os professores podem se autenticar.
- **Profile.js**: Tela onde o professor pode visualizar e gerenciar seus posts.
- **PostList.js**: Lista os posts criados.
- **Post.js**: Componente de cada post individualmente exibido no PostList.
- **ModalPost.js**: Modal para criar ou editar posts.
- **ProtectedRoute.js**: Componente para proteger as rotas que exigem autenticação.
- **FilterModal.js**: Modal para filtrar posts por categoria.
- **Toolbar.js**: Barra de navegação que contém links para as páginas principais da aplicação.

## Deploy

A aplicação está hospedada na **Vercel** e é automaticamente atualizada com cada novo commit no branch `main`.


## Como funciona o gerenciamento de posts

- **Criação de posts**: Professores podem criar posts com título e conteúdo.
- **Edição de posts**: Professores podem editar posts existentes.
- **Exclusão de posts**: Posts podem ser removidos pela interface de gerenciamento de posts no perfil do professor.
- **Visualização**: Todos os usuários podem visualizar os posts na página inicial.

## Configuração do Ambiente

### Clonando o Repositório

Para começar a desenvolver localmente, siga os passos abaixo:

1. **Clone o repositório** para sua máquina local utilizando o comando Git:

   ```bash
   git clone https://github.com/usuario/educahub-ui.git
   
2. **Navegue para o diretório do projeto** e **Instale as dependências** necessárias para o projeto com o comando:

   ```bash
   npm install
   
3. **Inicie a aplicação** localmente com o comando:

   ```bash
   npm start

Observação
Você pode usar a API em produção, pois para esta atividade o CORS foi liberado. Isso permite que você conecte a aplicação local diretamente à API sem a necessidade de configurações adicionais no backend.

