import {useState, useEffect} from "react"

export type Film = {
    id: number
    title: string
    poster_path: string | null
    vote_average: number
}

export const useFavorites = () => {
    const [likedIds, setLikedIds] = useState<number[]>([])
    const [, setFilms] = useState<Film[]>([])
    useEffect(() => {
        const stored = localStorage.getItem('films')
        let films: Film[] = []

        try {
            const parsed = stored ? JSON.parse(stored) : []
            films = Array.isArray(parsed) ? parsed : [] // <-- защита от объектов
        } catch {
            films = []
        }
        setLikedIds(films.map((el)=>el.id))
    }, [])
    const toggleFavorite = (film: Film) => {
        setLikedIds((prev) => {
            const stored = localStorage.getItem('films')
            let films: Film[] = []
            try {
                const parsed = stored ? JSON.parse(stored) : []
                films = Array.isArray(parsed) ? parsed : []
            } catch {
                films = []
            }
            if(prev.includes(film.id)){
                const update = prev.filter((f) => f !== film.id)
                const newfilms = films.filter((f) => f.id != film.id)
                localStorage.setItem('films', JSON.stringify(newfilms))
                setFilms(newfilms)
                return update
            }
            else {
                const newFilms = [...films, film]
                localStorage.setItem('films', JSON.stringify(newFilms))
                setFilms(newFilms)
                return [...prev, film.id]
            }
        })
    }
    return {likedIds, toggleFavorite}
}