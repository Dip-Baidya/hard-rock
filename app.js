//Enter button For search
document.getElementById('search-field').addEventListener("keypress", function (event) {
    if (event.key == 'Enter') {
        document.getElementById('search-button').click();
    }
});


const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    togglerSpinner();

    //load Data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError('some Thing went wrong!! please try again later'));
}

// const searchSongs = async () => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`;

//     //load Data
//     const res = await fetch(url)
//     const data = await res.json();
//     displaySongs(data.data);
// }

const displaySongs = songs => {
    songs.forEach(song => {
        const songContainer = document.getElementById('song-container');
        songContainer.innerHTML = '';

        songs.forEach(song => {
            const songDiv = document.createElement('div');
            songDiv.className = 'single-result row align-items-center my-3 p-3';
            songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>`;
            songContainer.appendChild(songDiv);
            togglerSpinner();

        })
    })
}

// const getLyric = async (artist, title) => {
//     const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`
//     try {
//         const res = await fetch(url);
//         const data = await res.json();
//         displayLyric(data.lyrics)
//     } 
//     catch (error) {
//         displayError('Sorry! I failed to load Lyrics Try again later !!')
//     }
// }


const getLyric = (artist, title) => {
    const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyric(data.lyrics))
        .catch(error => displayError('Sorry! I failed to load Lyrics Try again later !!'));
}

const displayLyric = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

const togglerSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');

    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
}
