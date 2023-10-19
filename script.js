function loadCSV() {
    // Caminho para o arquivo CSV
    const csvFilePath = 'actions.csv';
    console.log("loadCSV");
    // Use a biblioteca PapaParse para ler o CSV
    Papa.parse(csvFilePath, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function (results) {
            const actions = results.data;
            const tableBody = document.querySelector('#actions-table tbody');

            // Limpe qualquer conteúdo existente na tabela
            tableBody.innerHTML = '';

            // Preencha a tabela com os dados do CSV
            actions.forEach(function (action) {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const descriptionCell = document.createElement('td');

                nameCell.textContent = action.Ação;
                descriptionCell.textContent = action.Descrição;

                row.appendChild(nameCell);
                row.appendChild(descriptionCell);
                tableBody.appendChild(row);
            });
        }
    });
}

//window.addEventListener('load', loadCSV);

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

//Função para exibir mapa do Google
function initMap() {
    var coordenadas = { lat: -21.77656, lng: -45.84683 }; // Substitua com as coordenadas do local desejado
    var mapa = new google.maps.Map(document.getElementById("map"), {
        zoom: 10, // Nível de zoom
        center: coordenadas // Localização do mapa
    });

    var marcador = new google.maps.Marker({
        position: coordenadas,
        map: mapa,
        title: "Local desejado"
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

// Carrega a API do Google Sheets e inicia a aplicação
gapi.load('client', initGoogleSheetsApi);



