import React from 'react';

const MovieDetails = ({ movie, onClose }) => {
  return (
    <div className="movie-details">
      <button onClick={onClose}>Close</button>
      <h2>{movie.Title} ({movie.Year})</h2>
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'} 
        alt={movie.Title} 
        style={{ width: '300px', height: 'auto' }} 
      />
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      
    </div>
  );
};

export default MovieDetails;
