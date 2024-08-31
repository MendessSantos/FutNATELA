function changeChannel(url) {
    const playerContainer = document.querySelector('.canal');
    playerContainer.innerHTML = ''; // Limpa o conteúdo anterior
    playerContainer.style.backgroundImage = 'none'; // Remove a imagem de fundo

    if (url.endsWith('.m3u8')) {
        // Reprodução de vídeos M3U8 com Video.js
        const video = document.createElement('video');
        video.className = 'video-js vjs-default-skin';
        video.controls = true;
        video.autoplay = true;
        video.style.width = "100%";
        video.style.height = "100%";
        video.setAttribute('data-setup', '{}');
        playerContainer.appendChild(video);

        const player = videojs(video);
        player.src({
            src: url,
            type: 'application/x-mpegURL'
        });
    } else if (url.endsWith('.php')) {
        // Exibição de links PHP usando um iframe
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = 'none';  // Remove borda do iframe
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
