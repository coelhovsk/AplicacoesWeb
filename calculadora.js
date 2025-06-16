function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function backspace() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = document.getElementById('display').value.replace(/×/g, '*');
        const result = new Function('return ' + expression)();
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Erro';
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '(', ')'];

    if (validKeys.includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
