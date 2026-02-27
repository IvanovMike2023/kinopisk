import s from './SearchResult.module.css'
type Props={
    title:string,
    poster_path:string
    vote_average:number
}
export const SearchResult=(props):Props=>{
    return (
            <article className={s.card}>
                <div className={s.posterFrame} >
                    <a className={s.posterLink}  href="">
                        <img className={s.poster} src={'https://image.tmdb.org/t/p/w185'+props.poster_path} alt=""/>
                        <span className={s.vote_average}>{props.vote_average}</span>
                    </a>
                </div>
                <a href="#" className={s.cardTitle}>{props.title}</a>
            </article>
    )
}