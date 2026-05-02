import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlus,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { createLibrarySong } from "../data";

const SongBrowser = ({ catalog, songs, setSongs, isOpen, setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(catalog);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedMood, setSelectedMood] = useState("All");

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(catalog.map((song) => song.genre))];
    return ["All", ...uniqueGenres.sort()];
  }, [catalog]);

  const moods = useMemo(() => {
    const uniqueMoods = [...new Set(catalog.map((song) => song.mood))];
    return ["All", ...uniqueMoods.sort()];
  }, [catalog]);

  useEffect(() => {
    setIsLoading(true);

    const searchTimeout = setTimeout(() => {
      const normalizedSearch = searchTerm.trim().toLowerCase();
      let results = catalog;

      if (normalizedSearch) {
        results = results.filter((song) =>
          [song.name, song.artist, song.genre, song.mood]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch)
        );
      }

      if (selectedGenre !== "All") {
        results = results.filter((song) => song.genre === selectedGenre);
      }

      if (selectedMood !== "All") {
        results = results.filter((song) => song.mood === selectedMood);
      }

      setFilteredSongs(results);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(searchTimeout);
  }, [catalog, searchTerm, selectedGenre, selectedMood]);

  const isSongInLibrary = (songToCheck) =>
    songs.some((song) => song.id === songToCheck.id);

  const addToLibrary = (songToAdd) => {
    if (!isSongInLibrary(songToAdd)) {
      setSongs([...songs, createLibrarySong(songToAdd)]);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <aside
      className={`song-browser ${isOpen ? "active" : ""}`}
      aria-hidden={!isOpen}
      aria-label="Browse songs"
    >
      <div className="browser-header">
        <div>
          <h2>Browse Songs</h2>
          <p>{catalog.length} royalty-free tracks</p>
        </div>
        <button
          type="button"
          className="close-browser"
          onClick={() => setIsOpen(false)}
          aria-label="Close song browser"
        >
          <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
        </button>
      </div>

      <div className="search-container">
        <div className="search-input-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search songs, artists, genres, or moods"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search songs"
            autoComplete="off"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="filter-group" aria-label="Genre filters">
          <span>Genre</span>
          <div className="filter-chips">
            {genres.map((genre) => (
              <button
                type="button"
                key={genre}
                className={`filter-chip ${
                  selectedGenre === genre ? "active" : ""
                }`}
                onClick={() => setSelectedGenre(genre)}
                aria-pressed={selectedGenre === genre}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group" aria-label="Mood filters">
          <span>Mood</span>
          <div className="filter-chips">
            {moods.map((mood) => (
              <button
                type="button"
                key={mood}
                className={`filter-chip ${
                  selectedMood === mood ? "active" : ""
                }`}
                onClick={() => setSelectedMood(mood)}
                aria-pressed={selectedMood === mood}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="browser-songs">
        {isLoading ? (
          <div className="loading">
            <p>Loading songs...</p>
          </div>
        ) : filteredSongs.length === 0 ? (
          <div className="no-results">
            <p>No tracks match your filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedGenre("All");
                setSelectedMood("All");
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredSongs.map((song) => {
            const isInLibrary = isSongInLibrary(song);
            return (
              <div className="browser-song" key={song.id}>
                <div className="song-info">
                  <img
                    src={song.cover}
                    alt={song.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=500&auto=format&fit=crop";
                    }}
                  />
                  <div className="song-details">
                    <h3>{song.name}</h3>
                    <h4>{song.artist}</h4>
                    <div className="song-tags">
                      <span>{song.genre}</span>
                      <span>{song.mood}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`add-button ${isInLibrary ? "added" : ""}`}
                  onClick={() => addToLibrary(song)}
                  disabled={isInLibrary}
                  aria-label={
                    isInLibrary
                      ? `${song.name} is already in your library`
                      : `Add ${song.name} to your library`
                  }
                >
                  <FontAwesomeIcon
                    icon={isInLibrary ? faCheck : faPlus}
                    aria-hidden="true"
                  />
                </button>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

SongBrowser.propTypes = {
  catalog: PropTypes.array.isRequired,
  songs: PropTypes.array.isRequired,
  setSongs: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default SongBrowser;
