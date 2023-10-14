const chatDisplay = document.getElementById('chat-display');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const googleApiKey = 'AIzaSyDtSm8WyC-AfQXxU42ilgHc6dEfdSRH3MA'; // Replace with your actual API key
    const googleCxId = 'a3c0f792f89d349f6'; // Replace with your actual CX ID

    sendButton.addEventListener('click', () => {
        const userMessage = userInput.value;
        chatDisplay.innerHTML += `<p>You: ${userMessage}</p>`;
        userInput.value = '';


        fetch(`https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleCxId}&q=${userMessage}`)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    const searchResults = data.items;
                    let chatbotResponse = 'Chatbot: \n\n';

                    searchResults.forEach((result, index) => {
                        const title = result.title;
                        const snippet = result.snippet;
                        chatbotResponse += `\n${index}.:\n${snippet}\n\n`;
                    });

                    chatDisplay.innerHTML += `<p>${chatbotResponse}</p>`;
                } else {
                    chatDisplay.innerHTML += `<p>Chatbot: I couldn't find any results for your query.</p>`;
                }
            })
            .catch(error => {
                chatDisplay.innerHTML += `<p>Chatbot: An error occurred while searching.</p>`;
            });
    });