
function handleInput() {
    // Get entered values
    var text = document.getElementById('textInput').value;
    var key = document.getElementById('password').value;
    const errorText = document.getElementById('error');

    if (!key) {
        errorText.innerHTML = "You must enter a password!";
        return;
    }
    else if (!text) {
        errorText.innerHTML = "You must enter some text!";
        return;
    }
    else {
        errorText.innerHTML = "";
    }

    // Get and hide the input panel div
    const inputPanel = document.getElementById('input-panel');
    inputPanel.style.display = "none";

    // Encrypt text and generate QR code
    generateQRCode(encryptText(text, key));
}

function encryptText(text, key) {
    var encrypted = CryptoJS.AES.encrypt(text, key);
    var URL = "https://tedgravlin.github.io/QR-Crypt/decrypt#" + encrypted;

    return URL;
}

function decryptText() {
    const errorText = document.getElementById('error');

    // Get the current URL
    var currentURL = window.location.href;
    // Remove everything from the URL except for the encrypted message
    var encryptedMessage = currentURL.replace(/(.*)#/, "");

    // Get the key from the user
    var key = document.getElementById('password').value;

    if (!key) {
        errorText.innerHTML = "You must enter a password!";
        return;
    }

    // Decrypt the message 
    var decryptedText = CryptoJS.AES.decrypt(encryptedMessage, key);
    decryptedText = decryptedText.toString(CryptoJS.enc.Utf8);

    // Display the decrypted message on the page
    document.getElementById('textOutput').value = decryptedText;
    document.getElementById('textOutput').style.visibility = "visible";
}

function generateQRCode(URL) {
    const container = document.getElementById('qrcodecontainer');
    var qrcode = new QRious({
        element: document.getElementById("qrcode"),
        background: '#ffffff',
        backgroundAlpha: 0,
        foreground: '#7ed957',
        foregroundAlpha: 1,
        level: 'H',
        padding: null,
        size: 500,
        value: URL
    });
    // Unhide the div
    document.getElementById('qrcodecontainer').style.display = "block";
    // Unhide the canvas
    document.getElementById('qrcode').style.visibility = "visible";
    // Unhide the QR Code actions
    document.getElementById('qrcodebuttons').style.visibility = "visible";
}

function downloadQRCode() {
    const downloadLink = document.getElementById('downloadLink');
    const QRCode = document.getElementById('qrcode');
    downloadLink.setAttribute('download', 'QR-Crypt.png');
    downloadLink.setAttribute('href', QRCode.toDataURL("image/png"));
}