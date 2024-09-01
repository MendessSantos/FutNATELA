function changeChannel(url) {
    const playerContainer = document.querySelector('.canal');
    playerContainer.innerHTML = ''; // Limpa o conteúdo anterior
    playerContainer.style.backgroundImage = 'none'; // Remove a imagem de fundo

    if (url.endsWith('.m3u8')) {
        // Reprodução de vídeos M3U8 com Video.js e HLS.js
        const video = document.createElement('video');
        video.className = 'video-js vjs-default-skin';
        video.controls = true;
        video.autoplay = true;
        video.style.width = "100%";
        video.style.height = "100%";
        video.setAttribute('data-setup', '{}');
        playerContainer.appendChild(video);

        const player = videojs(video);

        // Verifica se o navegador suporta M3U8 nativamente
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Para navegadores que suportam M3U8 nativamente
            video.src = url;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        } else {
            console.error('Este navegador não suporta M3U8.');
        }

    } else if (url.endsWith('.php')) {
        // Exibição de links PHP usando um iframe
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = 'none';
        iframe.onload = function() {
            console.log('Iframe carregado com sucesso.');
        };
        iframe.onerror = function() {
            console.error('Erro ao carregar o iframe.');
            playerContainer.innerHTML = 'Erro ao carregar o conteúdo.';
        };
        playerContainer.appendChild(iframe);
    } else {
        console.error('Formato de URL não suportado:', url);
    }
}
