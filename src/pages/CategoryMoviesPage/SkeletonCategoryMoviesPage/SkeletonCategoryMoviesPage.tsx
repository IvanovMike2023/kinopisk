import s from "./SkeletonCategoryMoviesPage.module.css";
import {Skeleton} from "@mui/material";
type SkeletonType={
    activeCategory:string
}
export const SkeletonCategoryMoviesPage = ({activeCategory}:SkeletonType) => {
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
                                        <Skeleton variant="rectangular" width={180} height={270} sx={{ margin: 1, borderRadius: 1 }}/>
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
