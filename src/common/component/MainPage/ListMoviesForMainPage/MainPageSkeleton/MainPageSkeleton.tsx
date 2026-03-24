import Skeleton from "@mui/material/Skeleton"
import {SearchInput} from "../../../SearchInput/searchInput";
import s from "../MainPageSkeleton/MainPageSkeleton.module.css";


export const MainPageSkeleton = () => (
    <div className={s.Container}>
        <section className={s.page}>
            <section
                className={s.section}>
                <div className={s.content}>
                    <h1 className={s.title}>Welcome</h1>
                    <h2 className={s.subtitle}>Browse highlighted titles from TMDB</h2>
                    <SearchInput/>
                </div>

            </section>
            <div className={s.wrappperItemMovies}>
                {Array(4).fill(null).map((_,id)=>(
                    <div key={id}  className={s.itemMovies}>
                        {Array(6).fill(null).map((_, id) => (
                            <div key={id} className={s.container}>
                                <Skeleton variant="rectangular" width={180} height={270} margin={10} sx={{borderRadius: 1}}/>
                                <Skeleton variant="rectangular" width={180} height={30} sx={{marginTop: 2, borderRadius: 1}}/>
                            </div>))}
                    </div>
                    ))}
            </div>

        </section>
    </div>

)

//     <>
//         {Array(6).fill(null).map((_,id)=>(
//             <div key={id} className={s.container}>
//                 <Skeleton variant="rectangular" width={180} height={270} margin={10} sx={{borderRadius: 1}}/>
//                 <Skeleton variant="rectangular" width={180} height={30} sx={{marginTop: 2, borderRadius: 1}}/>
//             </div>))}
//     </>
// )