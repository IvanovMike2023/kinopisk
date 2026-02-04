import s from './Header.module.css'
import logoUrl from '../img/logo.svg'
export const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.logo}><img src={logoUrl} alt="Логотип" width="150" /></div>
            <div className={s.menu}>
                <div className={s.menu_container}>
                    <div className={s.menu_container_item}>Main |</div>
                    <div className={s.menu_container_item}>Category Movies |</div>
                    <div className={s.menu_container_item}>Filtered Movies |</div>
                    <div className={s.menu_container_item}>Search |</div>
                    <div className={s.menu_container_item}>Favorites |</div>
                </div>

                <div className={s.menu_container_theme}>😀</div>
            </div>
        </div>)
}