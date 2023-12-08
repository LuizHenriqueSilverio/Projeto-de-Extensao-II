// Função para carregar e exibir dados da planilha do Google Sheets para Noticias
function loadGoogleSheetNews() {
    // ID da planilha do Google Sheets
    const spreadsheetId = '1Lh36jI-kUbPBr1ptiAAvZy7KE0UwRC4eXIGOz5JFmyU';
    // Nome da aba para notícias
    const sheetName = 'Noticias';

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'Noticias'
    }).then(function(response) {
        const data = response.result.values;
        const newsSection = document.getElementById('news-section');

        // Limpe qualquer conteúdo existente na seção de notícias
        newsSection.innerHTML = '';

        // Preencha a seção de notícias com os dados da planilha
        data.forEach(function(row) {
            const [title, newsDate, text, imageUrl] = row;

            const imageId = extractIdFromDriveUrl(imageUrl);

            // Crie elementos HTML para cada notícia
            const newsContainer = document.createElement('div');
            newsContainer.classList.add('row', 'mb-5');

            newsContainer.innerHTML = `
                <div class="col-md-6">
                    <h2>${title}</h2>
                    <h5>${newsDate}</h5>
                    <p>${text}</p>
                </div>
                <div class="col-md-6">
                    <img src="https://drive.google.com/uc?export=view&id=${imageId}" alt="${title}(imagem)" width="100%" height="100%">
                </div>
                <hr>
            `;

            // Adicione a notícia à seção de notícias
            newsSection.appendChild(newsContainer);
        });
    });
}

// Função que extrai o que está entre /d/ e /view de uma string
function extractIdFromDriveUrl(driveUrl) {
    // Define a expressão regular
    const regex = /\/d\/([a-zA-Z0-9_-]+)\/view/;

    // Tenta fazer o casamento usando a expressão regular
    const match = driveUrl.match(regex);

    // Retorna o que está entre /d/ e /view ou null se não houver correspondência
    return match ? match[1] : null;
}

// Inicialize a API do Google Sheets para Noticias
function initGoogleSheetsApiForNews() {
    gapi.client.init({
        apiKey: 'AIzaSyDP2YPmfohOSkUf-OXM-0zRXcfM6IJCaho',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetNews();
    });
}

// Carrega a API do Google Sheets e inicia a aplicação
gapi.load('client', initGoogleSheetsApiForNews);