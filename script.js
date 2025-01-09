// script.js

// URL da API
const API_URL = "https://embed.smashystream.com/list.php?type=movie&page=1";

// Elemento onde os filmes serão exibidos
const moviesContainer = document.getElementById("movies");

// Função para buscar os dados da API
async function fetchMovies() {
  try {
    // Fazendo a requisição GET à API
    const response = await fetch(API_URL);

    // Verificando se a resposta é válida
    if (!response.ok) {
      throw new Error("Erro ao buscar filmes: " + response.statusText);
    }

    // Convertendo a resposta para JSON
    const movies = await response.json();

    // Chamando a função para exibir os filmes
    displayMovies(movies);
  } catch (error) {
    console.error("Erro:", error);
    moviesContainer.innerHTML = `<p>Não foi possível carregar os filmes. Tente novamente mais tarde.</p>`;
  }
}

// Função para exibir os filmes no HTML
function displayMovies(movies) {
  // Limpando o container antes de exibir
  moviesContainer.innerHTML = "";

  // Iterando sobre cada filme retornado pela API
  movies.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    // Verifica se há imagem disponível
    const poster = movie.poster || "https://via.placeholder.com/100x150?text=No+Image";

    // Criando o conteúdo do filme
    movieElement.innerHTML = `
      <img src="${poster}" alt="${movie.title}">
      <div class="movie-details">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-description">${movie.description || "Descrição não disponível."}</div>
      </div>
    `;

    // Adicionando o elemento ao container
    moviesContainer.appendChild(movieElement);
  });
}

// Chamando a função para buscar os filmes ao carregar a página
fetchMovies();
