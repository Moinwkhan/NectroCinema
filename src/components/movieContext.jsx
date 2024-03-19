import { createContext, useState } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  return (
    <MovieContext.Provider value={{ selectedMovieId, setSelectedMovieId }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
