import { useState, useEffect } from 'react';
import { Link, useParams, Outlet, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../../services/requestsAPI';
import noimage from '../../images/noimage.png';
import s from './MovieDetails.module.css';

export default function Header() {
    const [movieData, setMovieData] = useState(null);
    const { movieId } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        getMovieDetails(movieId)
            .then(resp => setMovieData(resp))
            .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleGoBack() {
        navigate("/", { replace: true });
    };

    if (movieData) {
        const { poster_path, title, release_date, vote_average, overview, genres } = movieData;

        return (
            <div className={s.wrapper}>
                <button onClick={handleGoBack}>{'<- Go back'}</button>
                <div className={s.details}>
                    <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : noimage} width="250" height="375" alt="poster" />
                    <div className={s.stats}>
                        <h1>{title} ({release_date.slice(0, 4)})</h1>
                        <p>User score: {(vote_average * 10).toFixed(0)}%</p>
                        <h2>Overview</h2>
                        <p>{overview}</p>
                        <h3>Genres</h3>
                        <div>
                            {genres.map(({ name }) => <p key={name}>{name}</p>)}
                        </div>
                    </div>
                </div>
                <div  className={s.addInfo}>
                    <p>Additional information</p>
                    <ul>
                        <li><Link to={`/movies/${movieId}/cast`}>Cast</Link></li>
                        <li><Link to={`/movies/${movieId}/reviews`}>Reviews</Link></li>
                    </ul>
                </div>
                <Outlet />
            </div>
        );
    };
};