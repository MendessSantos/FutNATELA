function filterChannels() {
    const input = document.getElementById('search');
    const filter = input.value.toLowerCase();
    const channelItems = document.querySelectorAll('.channel-item');
    
    channelItems.forEach(function(item) {
        const text = item.textContent || item.innerText;
        if (text.toLowerCase().indexOf(filter) > -1) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function changeChannel(url) {
    const playerContainer = document.querySelector('.canal');
    playerContainer.innerHTML = ''; // Limpa o conteúdo anterior
    playerContainer.style.backgroundImage = 'none'; // Remove a imagem de fundo

    if (url.endsWith('.m3u8')) {
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.style.width = "100%";
        video.style.height = "100%";
        playerContainer.appendChild(video);

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
        }
    } else {
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        playerContainer.appendChild(iframe);
    }
}