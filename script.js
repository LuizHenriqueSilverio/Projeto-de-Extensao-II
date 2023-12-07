// Função para carregar e exibir dados da planilha do Google Sheets
function loadGoogleSheetData() {
    // ID da planilha do Google Sheets
    const spreadsheetId = '1NrKZXcG4BZ8YiVGgb7BkrDs5Cxvvn7xf1NyOKMswwC8';
    // ID da planilha dentro do documento (geralmente 0 para a primeira planilha)
    const sheetId = 0;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'Eventos' // Substitua pelo nome da aba que você deseja ler
    }).then(function(response) {
        const data = response.result.values;
        const tableBody = document.querySelector('#actions-table tbody');

        // Limpe qualquer conteúdo existente na tabela
        tableBody.innerHTML = '';

        // Preencha a tabela com os dados da planilha
        data.forEach(function(row) {
            const rowData = row.map(item => item || ''); // Lida com valores nulos ou indefinidos

            const tableRow = document.createElement('tr');
            rowData.forEach(function(cellData) {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                tableRow.appendChild(cell);
            });

            tableBody.appendChild(tableRow);
        });
    });
}

// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyDP2YPmfohOSkUf-OXM-0zRXcfM6IJCaho',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetData();
    });
}

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
                    <img src="${imageUrl}" alt="${title}(imagem)" width="100%" height="100%">
                </div>
                <hr>
            `;

            // Adicione a notícia à seção de notícias
            newsSection.appendChild(newsContainer);
        });
    });
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
gapi.load('client', initGoogleSheetsApi);
gapi.load('client', initGoogleSheetsApiForNews);