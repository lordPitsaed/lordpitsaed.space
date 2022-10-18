function generateChars(uppercaseCheck = false, lowercaseCheck = false, numsCheck = false, symbolsCheck = false) {
    let chars = [];

    if (uppercaseCheck) {
        chars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
    }

    if (lowercaseCheck) {
        chars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase().split(''))
    }

    if (numsCheck) {
        chars.push('0123456789'.split(''))
    }

    if (symbolsCheck) {
        chars.push("`~!@#$%^&*()-=_+[{]}\\|;':\",.<>/?".split(''))
    }
    return chars.flat()
}

function generatePassword(passLength, chars) {

    let password = [];

    for (let i = 0; i < passLength; i++) {
        let char = Math.floor(Math.random() * (chars.length + 1))
        password.push(chars[char]);
    }
    return password.join('');

}

function copyOutput(){
    let copyText = document.getElementById("output");
    
    if (copyText.className === 'active') {
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    } else {alert('Nothing here to copy! Generate password first.')}
}

function passwordStrength(length, passwordPool) {
    let entropy = length * (Math.log(passwordPool) / Math.log(2));
    if (entropy <= 49 ) {
        $('#strength-output').text('EASY');
        $('#first-cell').css('background', 'var(--password-strength-color)');
        $('#second-cell').css('background', 'var(--password-strength-color)');
        $('#third-cell').css('background', 'var(--password-strength-color)');
        
        $('#first-cell').css('background', 'var(--strength-cell-easy-color)');
    } else if (entropy >= 100) {
        $('#strength-output').text('HARD');
        $('#first-cell').css('background', 'var(--strength-cell-hard-color)');
        $('#second-cell').css('background', 'var(--strength-cell-hard-color)');
        $('#third-cell').css('background', 'var(--strength-cell-hard-color)');
    } else if (entropy <= 80) {
        $('#strength-output').text('MEDIUM');
        $('#first-cell').css('background', 'var(--password-strength-color)');
        $('#second-cell').css('background', 'var(--password-strength-color)');
        $('#third-cell').css('background', 'var(--password-strength-color)');

        $('#first-cell').css('background', 'var(--strength-cell-medium-color)');
        $('#second-cell').css('background', 'var(--strength-cell-medium-color)');
    }
}

function setOutput(){
    let length = document.getElementById('length').value;
    let uppercaseCheck = $('#uppercase').is(':checked');
    let lowercaseCheck = $('#lowercase').is(':checked');
    let numsCheck = $('#numbers').is(':checked');
    let symbolsCheck = $('#symbols').is(':checked');
    let outputField = document.getElementById('output');

    if (!uppercaseCheck && !lowercaseCheck && !numsCheck && !symbolsCheck){
        alert('We need at least one char set to generate you a password!')
    } else {
    let chars = generateChars(uppercaseCheck, lowercaseCheck, numsCheck, symbolsCheck);
    let output = generatePassword(length, chars);
    let passwordPool = chars.length
    outputField.setAttribute('value', output);
    outputField.setAttribute('class', 'active');
    passwordStrength(length, passwordPool)
    }
}

