import React, {FC, useState} from 'react'
import {Modal} from '../modal/modal'
import axios from 'axios';
import './character.css'
import {Link} from "react-router-dom";

export type Props = {
    id: number
    name: string
    image: string
    status: string
    location: {
        name: string
        url: string
    }
}

type Planet = {
    name: string,
    dimension: string,
    residents: string[]
}

export const Character: FC<Props> = ({id, name, image, status, location}) => {
    const [showStatusOverlay, setShowStatusOverlay] = useState(false)
    const [planet, setPlanet] = useState<Planet>()
    const [planetLoading, setPlanetLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [resident, setResident] = useState<Props>()

    const fetchPlanetData = () => {
        setPlanetLoading(true)

        axios.get(location.url).then((res) => { 
            setPlanet(res.data)
            setPlanetLoading(false)
        })
    }

    const closeResidentsModal = () => {
        setModalOpen(false)
    }

    const openResidentsModal = (residentURL: string) => {

        setModalOpen(true)

        axios.get(residentURL).then((res) => { 
            setResident(res.data)
            setPlanetLoading(false)
        })
    }

    return (
        <div>
            <div className="character__image-wrapper">
                {showStatusOverlay && (
                    <div 
                        className="character__overlay"
                        onClick={() => setShowStatusOverlay(false)}
                    >
                        {status}
                    </div>
                )}
                <img 
                    src={image} 
                    alt="" 
                    className="character__image"
                    onClick={() => setShowStatusOverlay(true)}
                />
            </div>
            <p className="margin-bottom--8 character-name">
                {name}
            </p>
            {!planet ? (
                <div className="planet-info-button">
                    <button 
                        className="button button2"
                        title={location.name}
                        onClick={() => fetchPlanetData()}
                    >
                    View his planet info
                    </button>
                </div>

            ) : (
                <div>
                    <p className="planet-information-title">Planet Information:</p>
                    <p className="margin-bottom--8">
                        <b>Name:</b> {planet.name}
                        <br/>
                        <b>Dimension:</b> {planet.dimension}
                        <br/>
                        <b>Population:</b> {planet.residents.length}
                    </p>
                    <div className="first-resident-button">
                        <button
                            className="button button3"
                            onClick={() => openResidentsModal(planet.residents[0])}
                        >
                        View planet's first resident
                        </button>
                    </div>
                </div>
            ) }
            {planetLoading && <p>loading...</p>}
            <div className="margin-bottom--8"></div>
            <div className="read-more">
                <Link to={`/character/${id}`}>
                    <button className="buttton button2">Read More</button>
                </Link>
            </div>
            {modalOpen && ( 
                resident ? (
                <Modal onClick={closeResidentsModal}>
                    <div className="resident-container">
                        <div className="resident-image">
                            <img src={resident.image} alt={resident?.name}/>
                        </div>
                        <div className="resident-info">
                            <p className="first-resident-title">Planet first resident</p>
                            <p><b>Name:</b> {resident.name}</p>
                            <p><b>Status:</b> {resident.status}</p>
                        </div>
                    </div>
                </Modal>
            ) : (
                <p>loading...</p>
            ))}
        </div>
    )
}