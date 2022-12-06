import {useDispatch, useSelector} from "react-redux";
import {useEffect, } from "react";

import {movieActions} from "../../redux/slices/movie.slice";
import {Movie} from "../Movie/Movie";
import css from './Movies.module.css'
import {PaginationForMovies} from "../PaginationForMovies/PaginationForMovies";
import {MoviesCarousel} from "../MoviesCarousel/MoviesCarousel";
import useLocalStorage from "use-local-storage";


const Movies = () => {

    let [currentPage, setCurrentPage] = useLocalStorage('page',8);


    console.log(currentPage);

    const page = currentPage

    // const [page, setPage] = useState(1);

    const {movies} = useSelector(state => state.movieReducer)

    const dispatch = useDispatch()

    let totalPages = movies.total_pages

    useEffect(() => {
        dispatch(movieActions.getAll({page}))
        window.scrollTo(0, 0);
    }, [dispatch, page]);

    return (
        <div className={css.wrap}>
            <div className={css.carouselContainer}>
                <MoviesCarousel/>
            </div>
            <div className={css.container}>
                {movies.results && movies.results.map(movie => <Movie key={movie.id} movie={movie}/>)}
                <PaginationForMovies totalPages={totalPages} setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    );
};

export {Movies};