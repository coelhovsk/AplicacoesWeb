 
document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.getElementById('cep');
    const clearButton = document.getElementById('clearButton');
    const submitButton = document.getElementById('submitButton');
    const addressForm = document.getElementById('addressForm');
    const addressList = document.getElementById('addressList');

    // Carrega endereços salvos ao iniciar
    loadSavedAddresses();

    // Função para buscar o endereço via CEP
    async function fetchAddress(cep) {
        cep = cep.replace(/\D/g, '');

        if (cep.length !== 8) {
            alert('CEP deve conter 8 dígitos');
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado');
                return;
            }

            document.getElementById('logradouro').value = data.logradouro || '';
            document.getElementById('complemento').value = data.complemento || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('localidade').value = data.localidade || '';
            document.getElementById('uf').value = data.uf || '';
            document.getElementById('ibge').value = data.ibge || '';
            document.getElementById('ddd').value = data.ddd || '';

        } catch (error) {
            alert('Erro ao buscar o CEP. Tente novamente.');
            console.error('Erro:', error);
        }
    }

    // Quando sair do campo CEP
    cepInput.addEventListener('blur', function () {
        if (this.value.trim() !== '') {
            fetchAddress(this.value);
        }
    });

    // Enter no campo CEP
    cepInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (this.value.trim() !== '') {
                fetchAddress(this.value);
            }
        }
    });

    // Apenas números no CEP
    cepInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });

    // Limpar formulário
    clearButton.addEventListener('click', function () {
        addressForm.reset();
    });

    // Salvar endereço
    submitButton.addEventListener('click', function () {
        saveAddress();
    });

    // Função para salvar o endereço no localStorage
    function saveAddress() {
        const nome = document.getElementById('nome').value.trim();
        const cep = document.getElementById('cep').value.trim();

        if (!nome || !cep) {
            alert('Por favor, preencha pelo menos o nome e o CEP');
            return;
        }

        const addressData = {
            nome: nome,
            cep: cep,
            logradouro: document.getElementById('logradouro').value,
            complemento: document.getElementById('complemento').value,
            bairro: document.getElementById('bairro').value,
            localidade: document.getElementById('localidade').value,
            uf: document.getElementById('uf').value,
            ibge: document.getElementById('ibge').value,
            ddd: document.getElementById('ddd').value,
            timestamp: new Date().toISOString()
        };

        // Recupera endereços existentes ou cria um array vazio
        let savedAddresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];

        // Adiciona o novo endereço
        savedAddresses.push(addressData);

        // Salva no localStorage
        localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));

        // Atualiza a lista exibida
        loadSavedAddresses();

        // Limpa o formulário
        addressForm.reset();

        alert('Endereço salvo com sucesso!');
    }

    // Função para carregar e exibir endereços salvos
    function loadSavedAddresses() {
        const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];
        addressList.innerHTML = '';

        if (savedAddresses.length === 0) {
            addressList.innerHTML = '<p class="text-center">Nenhum endereço salvo ainda.</p>';
            return;
        }

        // Ordena por data (do mais recente para o mais antigo)
        savedAddresses.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        savedAddresses.forEach((address, index) => {
            const card = document.createElement('div');
            card.className = 'col-md-6 mb-3';
            card.innerHTML = `
                        <div class="card address-card">
                            <div class="card-header bg-success text-white">
                                <h5 class="card-title mb-0">${address.nome}</h5>
                            </div>
                            <div class="card-body">
                                <p class="card-text"><strong>CEP:</strong> ${address.cep}</p>
                                <p class="card-text"><strong>Endereço:</strong> ${address.logradouro || 'N/A'}</p>
                                <p class="card-text"><strong>Complemento:</strong> ${address.complemento || 'N/A'}</p>
                                <p class="card-text"><strong>Bairro:</strong> ${address.bairro || 'N/A'}</p>
                                <p class="card-text"><strong>Cidade/UF:</strong> ${address.localidade || 'N/A'}/${address.uf || 'N/A'}</p>
                                <p class="card-text"><small class="text-muted">Salvo em: ${new Date(address.timestamp).toLocaleString()}</small></p>
                            </div>
                            <div class="card-footer bg-light">
                                <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Excluir</button>
                            </div>
                        </div>
                    `;
            addressList.appendChild(card);
        });

        // Adiciona eventos aos botões de excluir
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                deleteAddress(parseInt(this.getAttribute('data-index')));
            });
        });
    }

    // Função para excluir um endereço
    function deleteAddress(index) {
        let savedAddresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];

        if (index >= 0 && index < savedAddresses.length) {
            if (confirm('Tem certeza que deseja excluir este endereço?')) {
                savedAddresses.splice(index, 1);
                localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
                loadSavedAddresses();
            }
        }
    }
});