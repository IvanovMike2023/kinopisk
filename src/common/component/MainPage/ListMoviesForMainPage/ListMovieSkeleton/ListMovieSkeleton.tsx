import Skeleton from "@mui/material/Skeleton"
import s from "./ListMovieSkeleton.module.css"

export const ListMovieSkeleton = () => (<>
        {Array(6).fill(null).map((_,id)=>(
            <div key={id} className={s.container}>
                <Skeleton variant="rectangular" width={180} height={270} margin={10} sx={{borderRadius: 1}}/>
                <Skeleton variant="rectangular" width={180} height={30} sx={{marginTop: 2, borderRadius: 1}}/>
            </div>))}
    </>
)