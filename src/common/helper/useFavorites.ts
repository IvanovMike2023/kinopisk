import {useState, useEffect} from "react"

type Film = {
    id: number
    title: string
    backdrop_path: string
    vote_average: number
}

export const useFavorites = () => {
    const [likedIds, setLikedIds] = useState<number[]>([])
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

    const togleFilm = (film: Film) => {
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
                return update
            }
            else {
                localStorage.setItem('films', JSON.stringify([...films, film]))
                return [...prev, film.id]
            }

        })

    }
    return {likedIds, togleFilm}
}