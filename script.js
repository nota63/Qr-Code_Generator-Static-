function generateQR() {
    const inputText = document.getElementById('inputText').value;
    const inputFile = document.getElementById('inputFile').files[0];
    const qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = '';

    if (inputText.trim() !== '' || inputFile) {
        if (inputFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64Image = event.target.result;
                createQRCode(base64Image);
            };
            reader.readAsDataURL(inputFile);
        } else {
            createQRCode(inputText);
        }
    } else {
        alert('Please enter a valid text or URL, or select an image.');
    }
}

function createQRCode(data) {
    const qrcodeContainer = document.getElementById('qrcode');
    const downloadLink = document.getElementById('downloadLink');

    const qrCode = new QRCode(qrcodeContainer, {
        text: data,
        width: 200,
        height: 200,
        colorDark: "#000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    qrcodeContainer.style.opacity = 1;

    downloadLink.style.display = 'block';

    const qrCanvas = qrcodeContainer.querySelector('canvas');
    const qrDataUrl = qrCanvas.toDataURL('image/png');
    downloadLink.href = qrDataUrl;

    showNotification('QR Code generated successfully!');
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    setTimeout(() => {
        notification.innerText = '';
    }, 5000);
}
