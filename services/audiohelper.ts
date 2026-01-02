// audioHelper.ts

export async function recordAudio(): Promise<{ data: string, mimeType: string }> {
    // 1. Unterstütztes Format finden
    const types = ['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/wav'];
    const mimeType = types.find(type => MediaRecorder.isTypeSupported(type)) || '';

    if (!mimeType) {
        throw new Error("Kein unterstütztes Audio-Format in diesem Browser gefunden.");
    }

    // 2. Stream anfordern
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType });
    const audioChunks: Blob[] = [];

    return new Promise((resolve, reject) => {
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            try {
                const audioBlob = new Blob(audioChunks, { type: mimeType });
                const base64Data = await blobToBase64(audioBlob);

                // Stream stoppen, um das Mikrofon-Icon im Browser zu schließen
                stream.getTracks().forEach(track => track.stop());

                resolve({
                    data: base64Data.split(',')[1],
                    mimeType: mimeType
                });
            } catch (err) {
                reject(err);
            }
        };

        // Aufnahme starten
        mediaRecorder.start();

        // Optional: Nach 5 Sekunden automatisch stoppen oder via UI-Event
        // setTimeout(() => { if(mediaRecorder.state === "recording") mediaRecorder.stop() }, 5000);

        // Wir geben den Recorder zurück, damit die UI ihn stoppen kann
        (window as any).currentRecorder = mediaRecorder;
    });
}

function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}