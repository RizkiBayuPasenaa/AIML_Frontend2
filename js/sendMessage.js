import { addMessage, chatBox, textarea } from './index.js'; 

function sendMessage() {
    const imageUrlGuest = '../asset/img/guestchat.svg';
    const imageUrlBot = '../asset/img/herochat.svg';

    const userMessage = textarea.value.trim();
    if (userMessage !== '') {
        addMessage(userMessage, 'user-chat', imageUrlGuest);

        const startTime = performance.now(); // Waktu mulai

        fetch('http://127.0.0.1:5000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            const endTime = performance.now(); // Waktu selesai
            const responseTime = (endTime - startTime) / 1000; // Menghitung durasi respons dalam detik

            const botMessage = data.response;
            addMessage(botMessage, 'bot-respond', imageUrlBot);

            console.log(`Durasi respon untuk pesan "${userMessage}": ${responseTime.toFixed(3)} seconds`); // Menampilkan waktu respons di konsol
            console.log(botMessage);
        })
        .catch(error => console.error('Error:', error));

        textarea.value = '';
    }
}

export { sendMessage };