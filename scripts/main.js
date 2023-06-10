function handleInput() {
    // Get entered values
    var text = document.getElementById('text').value;
    var key = document.getElementById('password').value;

    // Encrypt text and generate QR code
    generateQRCode(encryptText(text, key));
}

function encryptText(text, key) {
    var encrypted = CryptoJS.AES.encrypt(text, key);
    alert("ENCRYPTED: " + encrypted);
    var URL = "./decrypt/#" + encrypted;

    return URL;
}

function decryptText() {
    // Get the current URL
    var currentURL = window.location.href;
    // Remove everything from the URL except for the encrypted message
    var encryptedMessage = currentURL.replace(/(.*)#/, "");

    // Get the key from the user
    var key = document.getElementById('password').value;

    // Decrypt the message 
    var decryptedText = CryptoJS.AES.decrypt(encryptedMessage, key);
    decryptedText = decryptedText.toString(CryptoJS.enc.Utf8);

    // Display the decrypted message on the page
    document.getElementById('decryptedText').innerHTML = decryptedText;
}

function generateQRCode(URL) {
    var qrcode = new QRious({
        element: document.getElementById("qrcode"),
        background: '#ffffff',
        backgroundAlpha: 1,
        foreground: '#000000',
        foregroundAlpha: 1,
        level: 'H',
        padding: 0,
        size: 128,
        value: URL
    });
}