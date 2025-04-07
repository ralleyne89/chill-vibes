import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ songs, setFilteredSongs, setCurrentSong, audioRef, isPlaying }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // Handle search input changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = songs.filter(
      (song) =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, songs]);

  // Handle clicks outside the search component to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle song selection
  const handleSongSelect = (song) => {
    setCurrentSong(song);
    
    // Update active state in songs
    const newSongs = songs.map((s) => {
      if (s.id === song.id) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });
    
    setFilteredSongs(newSongs);
    
    // Play the song if music is currently playing
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
    
    // Clear search and close dropdown
    setSearchTerm("");
    setIsActive(false);
  };

  return (
    <div className={`search-bar ${isActive ? "active" : ""}`} ref={searchRef}>
      <div className="search-input-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search songs or artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsActive(true)}
          className="search-input"
        />
        {searchTerm && (
          <FontAwesomeIcon
            icon={faTimes}
            className="clear-icon"
            onClick={() => {
              setSearchTerm("");
              setSearchResults([]);
            }}
          />
        )}
      </div>
      
      {isActive && searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((song) => (
            <div
              key={song.id}
              className="search-result-item"
              onClick={() => handleSongSelect(song)}
            >
              <img 
                src={song.cover} 
                alt={song.name}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=500&auto=format&fit=crop";
                }}
              />
              <div className="result-details">
                <h4>{song.name}</h4>
                <p>{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  songs: PropTypes.array.isRequired,
  setFilteredSongs: PropTypes.func.isRequired,
  setCurrentSong: PropTypes.func.isRequired,
  audioRef: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default SearchBar;
