import React from 'react'

const LibrarySong = ({song, songs, setCurrentSong, id}) => {    
// Event Handler 
const songSelectHandler = () => {
    // filtering the state of songs to selected song
    const selectedSong = songs.filter((state) => state.id === id)
    setCurrentSong(selectedSong[0])
}

    return(
        <div onClick={songSelectHandler} className="library-song">
            <img alt={song.name} src={song.cover} />
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong