import Skeleton from "@mui/material/Skeleton"
import s from "../SkeletonSearchPage/SkeletonSearchPage.module.css";

export const SkeletonSearchPage = () => {
    return (
        <div className={s.Container}>
            <section className={s.page}>
                <section className={s.section}>
                    <div className={s.content}>

                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            className={s.titleSkeleton}
                        />

                        <div className={s.form}>
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                className={s.inputSkeleton}
                            />


                        </div>

                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            className={s.subtitleSkeleton}
                        />

                    </div>
                </section>
            </section>
        </div>
    )
}