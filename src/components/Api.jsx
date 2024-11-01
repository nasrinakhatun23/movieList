import React, { useEffect, useState } from 'react';

const Api = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null); 

  const fetchData = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response1 = await fetch(`https://www.omdbapi.com/?s=Avengers&apikey=1e54f907&page=${page}`);
      const data1 = await response1.json();

      const response2 = await fetch(`https://www.omdbapi.com/?s=Avengers&apikey=1e54f907&page=${page + 1}`);
      const data2 = await response2.json();

      if (data1.Response === "False" || data2.Response === "False") {
        setError(data1.Error || data2.Error || 'No movies found');
        setLoading(false);
        return;
      }

      const combinedMovies = [...(data1.Search || []), ...(data2.Search || [])];
      setMovies(combinedMovies);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=1e54f907`);
      const data = await response.json();
      
      if (data.Response === "False") {
        setError(data.Error);
        setLoading(false);
        return;
      }

      setSelectedMovie(data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setError('Error fetching movie details. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : selectedMovie ? ( 
        <div>
          <button onClick={() => setSelectedMovie(null)}>Back to List</button> 
          <h2>{selectedMovie.Title} ({selectedMovie.Year})</h2>
          <img 
            src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/150'} 
            alt={selectedMovie.Title} 
            style={{ width: '150px', height: 'auto' }} 
          />
          <p><strong>Director:</strong> {selectedMovie.Director}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
        </div>
      ) : (
        <>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {movies.map((movie) => (
              <li key={movie.imdbID} style={{ marginBottom: '20px' }}>
                <h3>{movie.Title} ({movie.Year})</h3>
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} 
                  alt={movie.Title} 
                  style={{ width: '150px', height: 'auto', cursor: 'pointer' }}
                  onClick={() => fetchMovieDetails(movie.imdbID)} 
                />
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Api;
