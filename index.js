const songName = document.getElementById("songName");
const songForm = document.querySelectorAll(".songForm");
const heading = document.getElementById("heading");
const albumCover = document.getElementById("albumCover");
const songAlbum = document.getElementById("songAlbum");
const songDesc = document.getElementById('songDesc');
const songLyrics = document.getElementById("songLyrics");
const disclaimer = document.getElementById("disclaimer");
let songArray = [];


async function fetchSongData(song){
    try{
        const songsURL = "https://taylor-swift-api.sarbo.workers.dev/songs";
        await fetch(songsURL).then(response => response.json())
        .then(value => value.forEach(element => {
            if((element.title.toLowerCase()).includes(song)){
                songArray.push(element.song_id);
                songArray.push(element.title);
                songArray.push(element.album_id);
                return songArray;
            }
        }));

    }
    catch(error){
        console.log(error);
    }
}


async function getSongInfo(data){
    const songInfoURL = `https://taylor-swift-api.sarbo.workers.dev/lyrics/${data}`;
    const response = await fetch(songInfoURL);
    if(!response){
        throw new Error("404 NOT FOUND")
    }
    return await response.json();
}


songForm[0].addEventListener("submit", async event => {
    event.preventDefault();
    const song = songName.value.toLowerCase();
    if(song){
        try{
            await fetchSongData(song);
            const songData = await getSongInfo(songArray[0])
            songDesc.style.display = "block";
            disclaimer.style.display = "none";
            heading.textContent = songData.song_title;
            albumCover.src = displayAlbum();

            album = songArray[2];
            console.log(album);
            switch(true){
                case (album === 2):
                    songAlbum.textContent = 'Taylor Swift';
                    songDesc.style.backgroundColor = "#3EB489";
                    heading.style.color = "#2f4f40";
                    songAlbum.style.color= "#2f4f40";
                    break;
                case (album === 3):
                    songAlbum.textContent = 'Fearless';
                    songDesc.style.backgroundColor = "#D4AF37";
                    heading.style.color = "#524921";
                    songAlbum.style.color= "#524921";
                    break;
                case (album === 4):
                    songAlbum.textContent = 'Speak Now';
                    songDesc.style.backgroundColor = "#460038";
                    heading.style.color = "#82707e";
                    songAlbum.style.color= "#82707e";
                    break;
                case (album === 5):
                    songAlbum.textContent = 'Red';
                    songDesc.style.backgroundColor = "#CD5C5C";
                    heading.style.color = "#2e0002";
                    songAlbum.style.color= "#2e0002";
                    break;
                case (album === 1):
                    songAlbum.textContent = '1989';
                    songDesc.style.backgroundColor = "#94a9bb";
                    heading.style.color = "#203840";
                    songAlbum.style.color= "#203840";
                    break;
                case (album === 6):
                    songAlbum.textContent = 'Reputation';
                    songDesc.style.backgroundColor = "#4E4B51";
                    heading.style.color = "#1c1c1c";
                    songAlbum.style.color= "#1c1c1c";
                    break;
                case (album === 7):
                    songAlbum.textContent = 'Lover';
                    songDesc.style.backgroundColor = "#FC8EAC";
                    heading.style.color = "#363075";
                    songAlbum.style.color= "#363075";
                    break;
                case (album === 8):
                    songAlbum.textContent = 'Folklore';
                    songDesc.style.backgroundColor = "#2A292B";
                    heading.style.color = "#C3CBC3";
                    songAlbum.style.color= "#C3CBC3";
                    break;
                case (album === 9):
                    songAlbum.textContent = 'Evermore';
                    songDesc.style.backgroundColor = "#dac0a7";
                    heading.style.color = "#3d352b";
                    songAlbum.style.color= "#3d352b";
                    break;
                case (album === 10):
                    songAlbum.textContent = 'Midnights';
                    songDesc.style.backgroundColor = "#4e4466";
                    heading.style.color = "#060717";
                    songAlbum.style.color= "#060717";
                    break;
                default:
                    heading.textContent = "SONG NOT FOUND IN DATABASE";
                    heading.style.color = "#7f0000";
                    heading.style.paddingLeft = "5px";
            }
            const lyricsList = songData.lyrics.split("\n");
            document.getElementById("lyricsContainer").style.display = "block";
            console.log(lyricsList);
            for (var i = 0; i < lyricsList.length; i++){
                const newP = document.createElement("p");
                newP.textContent = lyricsList[i];
                newP.classList.add("lyrics");
                document.getElementById("lyricsContainer").appendChild(newP);
            }
        }
        catch(error){
            console.error(error);
        }
}});

function displayAlbum(){
    let album = songArray[2];
    switch(true){
        case (album === 2):
            return "Asset/TaylorSwiftAlbum.jpg";
        case (album === 3):
            return "Asset/FearlessAlbum.jpg";
        case (album === 4):
            return "Asset/SpeakNowAlbum.jpg";
        case (album === 5):
            return "Asset/RedAlbum.jpg";
        case (album === 1):
            return "Asset/1989Album.jpg";
        case (album === 6):
            return "Asset/ReputationAlbum.jpg";
        case (album === 7):
            return "Asset/LoverAlbum.jpg";
        case (album === 8):
            return "Asset/FolkloreAlbum.jpg";
        case (album === 9):
            return "Asset/EvermoreAlbum.jpg";
        case (album === 10):
            return "Asset/MidnightsAlbum.jpg";
        default:
            return '';
    }
}