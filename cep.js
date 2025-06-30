
document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.getElementById('cep');
    const clearButton = document.getElementById('clearButton');

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

            // Preenche os campos do formulário
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
        document.getElementById('addressForm').reset();
    });
});
