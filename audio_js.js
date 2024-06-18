// JavaScript for audio capture and processing
let mediaRecorder;
let audioChunks = [];
let recognition;
let isRecording = false;

// Initialize speech recognition
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
} else {
    alert('Speech recognition not supported in this browser.');
}

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            isRecording = true;

            document.getElementById('startRecordBtn').disabled = true;
            document.getElementById('stopRecordBtn').disabled = false;

            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks);
                audioChunks = [];
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();

                // Process audio for text conversion
                recognition.start();
            });
        });

    recognition.addEventListener('result', event => {
        const transcript = event.results[0][0].transcript;

        // Here you can send transcript to a server for further processing and get results
        // For demo purposes, we'll use static results
        displayResults({
            quality: 0.95,
            clarity: 0.9,
            competence: 0.85,
            correctedSpeech: transcript, // Use the transcribed text for corrected speech
            transcribedSpeech: transcript // Display the transcribed text
        });
    });

    recognition.addEventListener('error', event => {
        console.error('Speech recognition error', event.error);
    });

    recognition.addEventListener('end', () => {
        if (isRecording) {
            recognition.start(); // Restart recognition if recording is still active
        }
    });
}

function stopRecording() {
    mediaRecorder.stop();
    isRecording = false;
    document.getElementById('startRecordBtn').disabled = false;
    document.getElementById('stopRecordBtn').disabled = true;
    recognition.stop();
}

function displayResults(results) {
    document.getElementById('qualityScore').innerText = results.quality;
    document.getElementById('clarityScore').innerText = results.clarity;
    document.getElementById('competenceScore').innerText = results.competence;
    document.getElementById('correctedSpeech').innerText = results.correctedSpeech;
    document.getElementById('transcribedSpeech').innerText = results.transcribedSpeech;
    document.getElementById('results').style.display = 'block';
}