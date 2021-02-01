import { useState, useEffect } from 'react';
import { useParams, NavLink, Route, useRouteMatch } from 'react-router-dom';

import Cast from './../Cast/Cast';
import Reviews from './../Reviews/Reviews';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '3142d2f0e702d1702011ab61439e63b1';

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    getMovieFullInfo();
  }, [movieId]);

  const getMovieFullInfo = () => {
    fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(movie => {
        setMovie(movie);
      });
  };

  const genres = movie.genres;

  return (
    <>
      {movie && (
        <div>
          <img src={movie.poster_path} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>User score: {movie.popularity}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {genres &&
              genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
          </ul>
          <hr />
        </div>
      )}
      <h2>Additional information</h2>
      <ul>
        <li>
          <NavLink to={`${url}/cast`}>Cast</NavLink>
        </li>
        <li>
          <NavLink to={`${url}/reviews`}>Reviews</NavLink>
        </li>
      </ul>
      <hr />
      <Route path={`${url}/cast`}>
        <Cast />
      </Route>

      <Route path={`${url}/reviews`}>
        <Reviews />
      </Route>
    </>
  );
}
