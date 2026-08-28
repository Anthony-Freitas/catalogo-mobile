# 📱 Catálogo Interativo Mobile

Projeto acadêmico desenvolvido para o curso de Análise e Desenvolvimento de Sistemas da **UniFECAF**. Trata-se de um aplicativo mobile de e-commerce e catálogo de produtos, focado em uma interface limpa, responsiva e na gestão eficiente de estados e consumo de dados.

## 🚀 Tecnologias Utilizadas

*   **React Native & Expo:** Estrutura principal do aplicativo, garantindo compatibilidade multiplataforma.
*   **React Navigation (Stack):** Gerenciamento de rotas e navegação fluida entre telas (sem o uso do expo-router, conforme requisitos).
*   **Redux Toolkit:** Gerenciamento global de estado para controle de sessão (Autenticação/Login).
*   **Axios:** Consumo de dados RESTful da API externa.
*   **DummyJSON API:** Fornecimento do banco de dados de produtos e categorias em tempo real.

## ⚙️ Funcionalidades Implementadas

*   **Autenticação Simulada:** Tela de login moderna com validação de campos (Regex para e-mail e limite de caracteres para senha), alertas de erro em tempo real e visibilidade de senha (toggle).
*   **Catálogo em Grid (2x2):** Listagem de produtos otimizada para melhor visualização das imagens.
*   **Filtros Dinâmicos:** 
    *   Separação por Seções (Masculina e Feminina).
    *   Scroll horizontal interativo para subcategorias (Camisetas, Bolsas, Relógios, etc.).
*   **Busca em Tempo Real:** Barra de pesquisa que cruza dados instantaneamente com os filtros ativos.
*   **Formatação e UI/UX:** Preços formatados dinamicamente para o padrão brasileiro (R$ 0.000,00) e layout limpo baseado em componentes flutuantes.
*   **Tela de Detalhes:** Visualização aprofundada do produto selecionado, destacando imagens, descrição completa e cálculo de descontos.

## 🛠️ Como Rodar o Projeto

1. Clone este repositório.
2. Acesse a pasta do projeto no terminal: `cd catalogo-mobile`
3. Instale as dependências:
   ```bash
   npm install

4. Inicie o servidor do Expo limpando o cache:
    ```bash
   npx expo start -c

5. Escaneie o QR Code com o aplicativo Expo Go (Android/iOS) ou rode em um emulador.