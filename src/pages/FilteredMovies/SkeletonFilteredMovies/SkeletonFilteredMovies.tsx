import {Skeleton} from "@mui/material";
import s from "./MainPageSkeleton.module.css"

export const SkeletonFilteredMovies = () => {
    return (
        <section className={s.section}>
            <div className={s.wrapper}>
                    <div className={s.menu}>
                    </div>
                    <div className={s.movies}>
                        {Array(4).fill(null).map((_, id) => (
                            <div key={id} className={s.itemMovies}>
                                {Array(5).fill(null).map((_, id) => (
                                    <div key={id}>
                                        <Skeleton variant="rectangular" width={180} height={270} sx={{ margin: 1, borderRadius: 1 }}/>
                                        <Skeleton variant="rectangular" width={180} height={30}
                                                  sx={{marginTop: 2, borderRadius: 1}}/>
                                    </div>))}

                            </div>
                        ))}
                    </div>
            </div>
        </section>

    )
}