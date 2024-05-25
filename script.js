let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Populate voice options when they become available
function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = ''; // Clear existing options

    voices.forEach((voice, i) => {
        let option = new Option(voice.name, i);
        voiceSelect.add(option);
    });

    if (voices.length > 0) {
        speech.voice = voices[0];
    }
}

// Initial population and update when voices change
window.speechSynthesis.onvoiceschanged = populateVoiceList;
populateVoiceList();

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});

document.getElementById("click_to_convert").addEventListener('click', function () {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!window.SpeechRecognition) {
        alert('Speech Recognition API not supported in this browser.');
        return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        document.getElementById("convert_to_text").innerText = transcript;
    });

    recognition.addEventListener('error', e => {
        console.error('Speech recognition error', e);
        alert('Error occurred in speech recognition: ' + e.error);
    });

    recognition.start();
});
