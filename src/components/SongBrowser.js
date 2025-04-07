import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
  faPlus,
  faCheck,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const SongBrowser = ({ songs, setSongs, isOpen, setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Sample catalog of songs to browse
  const songCatalog = useMemo(
    () => [
      // Jazz & Blues
      {
        name: "Midnight Jazz",
        cover:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop",
        artist: "Jazz Ensemble",
        color: ["#2C3E50", "#4CA1AF"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e7326f7d.mp3",
        genre: "Jazz",
      },
      {
        name: "Blue Notes",
        cover:
          "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=500&auto=format&fit=crop",
        artist: "Jazz Quartet",
        color: ["#2C3E50", "#4CA1AF"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b0abcbd.mp3",
        genre: "Jazz",
      },
      {
        name: "Saxophone Dreams",
        cover:
          "https://images.unsplash.com/photo-1541804627596-3b5b9ef58c93?q=80&w=500&auto=format&fit=crop",
        artist: "Smooth Jazz",
        color: ["#2C3E50", "#4CA1AF"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/10/14/audio_17cb7974ca.mp3",
        genre: "Jazz",
      },

      // Acoustic & Coffee Shop
      {
        name: "Morning Coffee",
        cover:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500&auto=format&fit=crop",
        artist: "Acoustic Vibes",
        color: ["#E8CBC0", "#636FA4"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/01/20/audio_d16d7196a7.mp3",
        genre: "Acoustic",
      },
      {
        name: "Café Ambience",
        cover:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=500&auto=format&fit=crop",
        artist: "Coffee House",
        color: ["#E8CBC0", "#636FA4"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
        genre: "Acoustic",
      },
      {
        name: "Acoustic Sunrise",
        cover:
          "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=500&auto=format&fit=crop",
        artist: "Morning Melodies",
        color: ["#E8CBC0", "#636FA4"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d16737d4fb.mp3",
        genre: "Acoustic",
      },

      // Urban & City
      {
        name: "Urban Dreams",
        cover:
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=500&auto=format&fit=crop",
        artist: "City Sounds",
        color: ["#3E5151", "#DECBA4"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b0abcbd.mp3",
        genre: "Urban",
      },
      {
        name: "Neon Lights",
        cover:
          "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=500&auto=format&fit=crop",
        artist: "Night City",
        color: ["#3E5151", "#DECBA4"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92a21.mp3",
        genre: "Urban",
      },
      {
        name: "Downtown Groove",
        cover:
          "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=500&auto=format&fit=crop",
        artist: "Urban Beats",
        color: ["#3E5151", "#DECBA4"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/10/12/audio_7ef4f9c89b.mp3",
        genre: "Urban",
      },

      // Nature & Ambient
      {
        name: "Ocean Waves",
        cover:
          "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=500&auto=format&fit=crop",
        artist: "Nature Sounds",
        color: ["#2193b0", "#6dd5ed"],
        audio:
          "https://cdn.pixabay.com/download/audio/2021/09/06/audio_8a901c8b5f.mp3",
        genre: "Nature",
      },
      {
        name: "Rainy Day",
        cover:
          "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=500&auto=format&fit=crop",
        artist: "Ambient Sounds",
        color: ["#373B44", "#4286f4"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/04/27/audio_2a7c8af5f0.mp3",
        genre: "Nature",
      },
      {
        name: "Forest Meditation",
        cover:
          "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=500&auto=format&fit=crop",
        artist: "Nature Therapy",
        color: ["#134E5E", "#71B280"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/05/16/audio_1952c68db0.mp3",
        genre: "Nature",
      },

      // Seasonal & Mood
      {
        name: "Sunset Groove",
        cover:
          "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=500&auto=format&fit=crop",
        artist: "Beach Vibes",
        color: ["#ff9966", "#ff5e62"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/10/14/audio_17cb7974ca.mp3",
        genre: "Seasonal",
      },
      {
        name: "Winter Chill",
        cover:
          "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?q=80&w=500&auto=format&fit=crop",
        artist: "Snow Beats",
        color: ["#7F7FD5", "#91EAE4"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d16737d4fb.mp3",
        genre: "Seasonal",
      },
      {
        name: "Autumn Leaves",
        cover:
          "https://images.unsplash.com/photo-1507371341162-763b5e419408?q=80&w=500&auto=format&fit=crop",
        artist: "Fall Melodies",
        color: ["#7F7FD5", "#91EAE4"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/05/27/audio_13f2a8d5da.mp3",
        genre: "Seasonal",
      },

      // Study & Focus
      {
        name: "Deep Focus",
        cover:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500&auto=format&fit=crop",
        artist: "Study Beats",
        color: ["#603813", "#b29f94"],
        audio:
          "https://cdn.pixabay.com/download/audio/2021/11/25/audio_cb5c5f0c52.mp3",
        genre: "Study",
      },
      {
        name: "Concentration",
        cover:
          "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=500&auto=format&fit=crop",
        artist: "Focus Music",
        color: ["#603813", "#b29f94"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/03/09/audio_c9b7d30a91.mp3",
        genre: "Study",
      },
      {
        name: "Productive Morning",
        cover:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=500&auto=format&fit=crop",
        artist: "Work Flow",
        color: ["#603813", "#b29f94"],
        audio:
          "https://cdn.pixabay.com/download/audio/2022/05/16/audio_1952c68db0.mp3",
        genre: "Study",
      },
    ],
    []
  );

  // Get unique genres for filter
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(songCatalog.map((song) => song.genre))];
    return ["All", ...uniqueGenres.sort()];
  }, [songCatalog]);

  useEffect(() => {
    // Simulate loading data from an API
    setIsLoading(true);
    setTimeout(() => {
      let results = songCatalog;

      // Filter by search term
      if (searchTerm) {
        results = results.filter(
          (song) =>
            song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by genre
      if (selectedGenre !== "All") {
        results = results.filter((song) => song.genre === selectedGenre);
      }

      setFilteredSongs(results);
      setIsLoading(false);
    }, 300);
  }, [searchTerm, songCatalog, selectedGenre]);

  const isSongInLibrary = (songToCheck) => {
    return songs.some(
      (song) =>
        song.name === songToCheck.name && song.artist === songToCheck.artist
    );
  };

  const addToLibrary = (songToAdd) => {
    if (!isSongInLibrary(songToAdd)) {
      const newSong = {
        ...songToAdd,
        id: uuidv4(),
        active: false,
        favorite: false,
      };
      setSongs([...songs, newSong]);
    }
  };

  return (
    <div className={`song-browser ${isOpen ? "active" : ""}`}>
      <div className="browser-header">
        <h2>Browse Songs</h2>
        <button className="close-browser" onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <div className="search-container">
        <div className="search-input-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search for songs or artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <FontAwesomeIcon
              icon={faTimes}
              className="clear-icon"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>

        <div className="filter-options">
          <button
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FontAwesomeIcon icon={faFilter} />
            <span>Filter</span>
          </button>

          {showFilters && (
            <div className="genre-filters">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`genre-button ${
                    selectedGenre === genre ? "active" : ""
                  }`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="browser-songs">
        {isLoading ? (
          <div className="loading">
            <p>Loading songs...</p>
          </div>
        ) : filteredSongs.length === 0 ? (
          <div className="no-results">
            <p>No songs found matching "{searchTerm}"</p>
          </div>
        ) : (
          <>
            {selectedGenre !== "All" && (
              <div className="genre-header">
                <h3>{selectedGenre}</h3>
              </div>
            )}
            {filteredSongs.map((song, index) => {
              const isInLibrary = isSongInLibrary(song);
              return (
                <div className="browser-song" key={index}>
                  <div className="song-info">
                    <img
                      src={song.cover}
                      alt={song.name}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=500&auto=format&fit=crop";
                      }}
                    />
                    <div className="song-details">
                      <h3>{song.name}</h3>
                      <h4>{song.artist}</h4>
                      <span className="song-genre">{song.genre}</span>
                    </div>
                  </div>
                  <button
                    className={`add-button ${isInLibrary ? "added" : ""}`}
                    onClick={() => addToLibrary(song)}
                    disabled={isInLibrary}
                  >
                    <FontAwesomeIcon icon={isInLibrary ? faCheck : faPlus} />
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

SongBrowser.propTypes = {
  songs: PropTypes.array.isRequired,
  setSongs: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default SongBrowser;
