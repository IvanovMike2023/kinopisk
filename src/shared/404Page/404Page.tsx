import {Link} from "react-router-dom"
import s from "./NotFoundPage.module.css"

export const NotFoundPage = () => {
    return (
        <div className={s.container}>
            <div className={s.content}>
                <h1 className={s.code}>404</h1>
                <h2 className={s.title}>
                    Page Not Found
                </h2>
                <p className={s.text}>
                    Sorry, the page you are looking for does not exist.
                </p>
                <Link to="/" className={s.button}>
                    Go Home
                </Link>

            </div>
        </div>
    )
}