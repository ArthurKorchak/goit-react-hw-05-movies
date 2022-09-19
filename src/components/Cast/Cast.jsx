import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieActors } from '../../services/requestsAPI';
import s from './Cast.module.css';

export default function Cast() {
    const [actors, setActors] = useState(null);
    const { movieId } = useParams();

    useEffect(() => {
        getMovieActors(movieId)
            .then(resp => setActors(resp.cast))
            .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if (actors) {
        return (
            <ul className={s.list}>
                {actors.map(({ id, profile_path, original_name, character }) => (
                    <li className={s.item} key={id}>
                        <img src={`https://image.tmdb.org/t/p/w500/${profile_path}`} width="80px" alt="actor_poster" />
                        <p>{original_name}</p>
                        <p>Character: {character}</p>
                    </li>
                ))}
            </ul>
        );
    };
};