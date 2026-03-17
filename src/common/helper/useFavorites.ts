import {useState, useEffect} from "react"

type Film = {
    id: number
    title: string
    backdrop_path: string
    vote_average: number
}

export const useFavorites = () => {
    const [likedIds, setLikedIds] = useState<number[]>([])

    // загрузка из localStorage
    useEffect(() => {
        const stored = localStorage.getItem('films')
        const films = stored ? JSON.parse(stored) : []
        setLikedIds(films.map((f: Film) => f.id))
    }, [])

    const toggleFavorite = (film: Film) => {

        setLikedIds((prev) => {
            if (prev.includes(film.id)) {
                // удалить
                const updated = prev.filter(id => id !== film.id)
                const stored = localStorage.getItem('films')
                const films = stored ? JSON.parse(stored) : []
                const newFilms = films.filter((f: Film) => f.id !== film.id)
                localStorage.setItem('films', JSON.stringify(newFilms))
                return updated
            } else {
                // добавить
                const stored = localStorage.getItem('films')
                const films = stored ? JSON.parse(stored) : []

                localStorage.setItem('films', JSON.stringify([...films, film]))

                return [...prev, film.id]
            }
        })
    }

    return {
        likedIds,
        toggleFavorite
    }
}