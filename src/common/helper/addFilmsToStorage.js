export const addFilmsToStorage=(newFilm)=>{
    const stored = localStorage.getItem('films')
    const films = stored ? JSON.parse(stored) : []
    const exist=films.some((f)=>f.id===newFilm.id)
    if(!exist){
        films.push(newFilm)
        localStorage.setItem('films', JSON.stringify(films))
    }
}