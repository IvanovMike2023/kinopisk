import s from "../../MainPage/ListMoviesForMainPage/MainPageSkeleton/MainPageSkeleton.module.css";
import {Skeleton} from "@mui/material";

export const SkeletonCategoryMoviesPage = ({activeCategory}) => {
    return (
        <div className={s.Container}>
            <h2>{activeCategory}</h2>
            <section className={s.page}>
                <div className={s.wrappperItemMovies}>
                    {Array(4).fill(null).map((_, id) => (
                        <div key={id} className={s.itemMovies}>
                            <div className={s.item}>
                                {Array(5).fill(null).map((_, id) => (
                                    <div key={id} className={s.container}>
                                        <Skeleton variant="rectangular" width={180} height={270} margin={10}
                                                  sx={{borderRadius: 1}}/>
                                        <Skeleton variant="rectangular" width={180} height={30}
                                                  sx={{marginTop: 2, borderRadius: 1}}/>
                                    </div>))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
