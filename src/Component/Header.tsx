import s from './Header.module.css'
export const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.logo}>МойЛоготип</div>
            <nav className={s.nav}>
                <a className={s.link} href="#home">Главная</a>
                <a className={s.link} href="#about">О нас</a>
                <a className={s.link} href="#contact">Контакты</a>
            </nav>
        </header>)
}