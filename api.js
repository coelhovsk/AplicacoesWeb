async function getData(type, id) {
    // Mostra o loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').innerHTML = '';

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/${type}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        return null;
    } finally {
        // Esconde o loading
        document.getElementById('loading').style.display = 'none';
    }
}

function exibirDados(dados, tipo) {
    const resultsDiv = document.getElementById('results');

    if (!dados) {
        resultsDiv.innerHTML = '<div class="alert alert-danger">Erro ao carregar dados</div>';
        return;
    }

    let html = '<div class="character-card">';

    if (tipo === 'character') {
        html += `
                    <img src="${dados.image}" alt="${dados.name}" class="character-img">
                    <h2>${dados.name}</h2>
                    <p><strong>Status:</strong> ${dados.status}</p>
                    <p><strong>Espécie:</strong> ${dados.species}</p>
                    <p><strong>Gênero:</strong> ${dados.gender}</p>
                    <p><strong>Origem:</strong> ${dados.origin.name}</p>
                    <p><strong>Localização:</strong> ${dados.location.name}</p>
                `;
    } else if (tipo === 'location') {
        html += `
                    <h2>${dados.name}</h2>
                    <p><strong>Tipo:</strong> ${dados.type}</p>
                    <p><strong>Dimensão:</strong> ${dados.dimension}</p>
                    <p><strong>Residentes:</strong> ${dados.residents.length}</p>
                `;
    } else if (tipo === 'episode') {
        html += `
                    <h2>${dados.name}</h2>
                    <p><strong>Episódio:</strong> ${dados.episode}</p>
                    <p><strong>Data de lançamento:</strong> ${dados.air_date}</p>
                    <p><strong>Personagens:</strong> ${dados.characters.length}</p>
                `;
    }

    html += '</div>';
    resultsDiv.innerHTML = html;
}

async function buscarPersonagem() {
    // Gera um ID aleatório entre 1 e 826 (total de personagens)
    const randomId = Math.floor(Math.random() * 826) + 1;
    const personagem = await getData('character', randomId);
    exibirDados(personagem, 'character');
}

async function buscarLocalizacao() {
    // Gera um ID aleatório entre 1 e 126 (total de localizações)
    const randomId = Math.floor(Math.random() * 126) + 1;
    const localizacao = await getData('location', randomId);
    exibirDados(localizacao, 'location');
}

async function buscarEpisodio() {
    // Gera um ID aleatório entre 1 e 51 (total de episódios)
    const randomId = Math.floor(Math.random() * 51) + 1;
    const episodio = await getData('episode', randomId);
    exibirDados(episodio, 'episode');
}

// Busca dados iniciais ao carregar a página
window.onload = buscarPersonagem;

// Ativa o link atual na navbar
document.getElementById('rickLink').classList.add('active-nav');