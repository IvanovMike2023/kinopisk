import {useState} from "react";

export const FavoritesPage=()=>{
    const stored = localStorage.getItem('films')
    const films = stored ? JSON.parse(stored) : []
    console.log(films)
    return <div></div>
}