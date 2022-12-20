import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";


import {tvShowActions} from "../../redux/slices";
import {PaginationMain} from "../PaginationMain/PaginationMain";
import {Card} from "../Card/Card";
import css from './TVShows.module.css'
import {SkeletonUI} from "../SkeletonUI/SkeletonUI";


const TVShows = () => {
    const {currentTheme} = useSelector(state => state.themeReducer);

    const [query] = useSearchParams({page: '1'});

    const {tvShows, totalPages, currentPage,loading} = useSelector(state => state.tvShowReducer)

    const dispatch = useDispatch();

    useEffect(() => {
        if (query.get('sort_by')) {
            dispatch(tvShowActions.getAll({
                page: query.get('page'),
                sort: query.get('sort_by')
            }));
        }
        if (!query.get('query')) {
            dispatch(tvShowActions.getAll({
                page: query.get('page'),
                genre: query.get('with_genres'),
            }));
        }
        else {
            dispatch(tvShowActions.search({
                page: query.get('page'),
                query: query.get('query'),
            }))
        }
    }, [query, currentPage]);

    return (

        <div>
            <div className={currentTheme === 'dark' ? css.wrap : css.lightWrap}>
                {
                    loading ?
                        <SkeletonUI/>
                        :
                        <div>
                            {tvShows && <div className={css.container}>
                                {tvShows && tvShows.map(value => <Card key={value.id} value={value}/>)}
                            </div>}
                        </div>
                }
                <div className={css.pagination}>
                    <PaginationMain totalPages={totalPages} currentPage={currentPage}/>
                </div>
            </div>

        </div>

        // <div className={currentTheme ==='dark' ? css.wrap : css.lightWrap}>
        //     <div className={css.carouselContainer}>
        //         {/*<MoviesCarousel/>*/}
        //     </div>
        //     {tvShows && <div className={css.container}>
        //         {tvShows && tvShows.map(value => <Card key={value.id} value={value}/>)}
        //     </div>}
        //     <div className={css.pagination}>
        //         <PaginationMain totalPages={totalPages} currentPage={currentPage}/>
        //     </div>
        // </div>
    );
};
export {TVShows};