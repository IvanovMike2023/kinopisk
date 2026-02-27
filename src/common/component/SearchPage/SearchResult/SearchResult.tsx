import s from './SearchResult.module.css'
type Props={
    title:string,
     backdrop_path:string
}
export const SearchResult=(props):Props=>{
    console.log(props.backdrop_path)
    return (
            <article className={s.card}>
                <div className={s.posterFrame} >
                    <a className={s.posterLink}  href="">
                        <img className={s.poster} src={'https://image.tmdb.org/t/p/w185'+props.backdrop_path} alt=""/>
                    </a>
                </div>
                <a href="#" className={s.cardTitle}>{props.title}</a>
            </article>
    )
}