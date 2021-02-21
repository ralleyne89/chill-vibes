import {useState} from 'react';
// import styles
import './styles/App.scss';
// Adding components
import Player from './components/Player';
import Song from './components/Song';
// Import util
import data from './util';

function App() {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      {/* <h1>Chill Vibes Music</h1> */}
      <Song currentSong={currentSong} setCurrentSong={setCurrentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      />
    </div>
  );
}

export default App;
