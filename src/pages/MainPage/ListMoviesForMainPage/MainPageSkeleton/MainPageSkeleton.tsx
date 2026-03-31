import Skeleton from "@mui/material/Skeleton"
import {SearchInput} from "../../../../shared/utils/SearchInput/searchInput";
import s from "./MainPageSkeleton.module.css";

export const MainPageSkeleton = () => {
    const title = ['Popular Movies', 'Top Rated Movies', 'Upcoming Movies', 'Now Playing']
    return (
        <div className={s.Container}>
            <section className={s.page}>
                <section
                    className={s.section}>
                    <div className={s.content}>
                        <Skeleton variant="rectangular" width={220} height={70} sx={{ margin: 1, borderRadius: 1 }}/>
                        <Skeleton variant="rectangular" width={380} height={50} sx={{ margin: 1, borderRadius: 1 }}/>
                        <Skeleton variant="rectangular" width={580} height={50} sx={{ margin: 1, borderRadius: 1 }}/>
                    </div>
                </section>
                <div className={s.wrappperItemMovies}>
                    {Array(4).fill(null).map((_, id) => (
                        <div key={id} className={s.itemMovies}>
                            <div>
                                <h2>{title[id]}</h2>
                            </div>
                            <div className={s.item}>
                                {Array(6).fill(null).map((_, id) => (
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

