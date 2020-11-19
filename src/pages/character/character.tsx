import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './character.css'
import {useParams} from "react-router-dom";
import { useHistory } from "react-router-dom";

type Props = {
    id: string
}

type Character = {
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: {
        name: string
        url: string
    }
    location: {
        name: string
        url: string
    }
    image: string
    episode: string[]
    created: string
 }

 type Episode = {
     id: number
     name: string
     episode: string
 }

const Character = () => {
    const { id } = useParams<Props>();
    const [character, setCharacter] = useState<Character>()
    const [episodes, setEpisodes] = useState<Episode[]>([])
    let history = useHistory();
    
    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`).then((res) => { 
            setCharacter(res.data)
        }).catch(({response}) => {
            if(response.status === 404) {
                history.push('/404')
            }
        })
    }, [])

    useEffect(() => {
        if(character) {
            character.episode.map((url) => {
                return (
                    axios.get(url).then((res) => {
                        setEpisodes(episodes => [...episodes, res.data])
                    })
                )
            })
        }
    }, [character])

    console.log(character?.episode)
    
    return (
        <div>
            {character && (
                <>
                    <h1>{character.name}</h1>
                    <div className="character-image-container">
                        <img 
                            src={character.image} 
                            alt={character.name}
                            className="character-image"
                        />
                    </div>
                    <div className="characters-container">
                        <div className="characters-information">
                            <p><b>Name:</b> {character.name}</p>
                            <p><b>Gender:</b> {character.gender}</p>
                            <p><b>Status:</b> {character.status}</p>
                            <p><b>Species:</b> {character.species}</p>
                            <p><b>Type:</b> {character.type}</p>
                            <p><b>Origin:</b> {character.origin.name}</p>
                            <p><b>Location:</b> {character.location.name}</p>
                            <p><b>Created:</b> {character.created}</p>
                        </div>
                        <div className="characters-information">
                            <p className="margin-bottom--16"><b>Episodes:</b></p>
                            <ul className="episodes-list">
                            {
                                episodes.map(({id, episode, name}) => {
                                    return (
                                        <li key={id}>
                                            {episode} | {name}
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Character