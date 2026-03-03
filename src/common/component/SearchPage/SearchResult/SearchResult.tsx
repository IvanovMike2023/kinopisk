import s from './SearchResult.module.css'
type Props={
    title:string,
    poster_path:string
    vote_average:number
}
export const SearchResult=(props):Props=>{
    return          <article className={s.card}>
                <div className={s.posterFrame} >
                    <a className={s.posterLink}  href="">
                        {    props.poster_path ? <img className={s.poster} src={'https://image.tmdb.org/t/p/w185'+props.poster_path} alt=""/>
                            :
                            <div className={s.posterFail}>No poster</div>
                        }
                        <button className={s.like }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
                                 focusable="false" className={s.favoriteIcon}><path
                                d="M12 21.35 10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                       </button>
                        <span className={props.vote_average>7 ? s.vote_average_top: s.vote_average}>{props.vote_average}</span>
                    </a>
                </div>
                <a href="#" className={s.cardTitle}>{props.title}</a>
            </article>

}