import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Character, Props as CharacterType} from '../../components/character/character'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import './Home.css';
import 'flexboxgrid';

const Home = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const [nextPage, setNextPage] = useState('')

  useBottomScrollListener(() => {
    getCharacterData(nextPage)
  })

  const getCharacterData = (url: string) => {
    axios.get(url).then(({data}) => {
        const {results, info} = data
        const characterResults: typeof characters = results

        setCharacters([...characters, ...characterResults])
        setNextPage(info.next)
      })
  }

  useEffect(() => {
    getCharacterData('https://rickandmortyapi.com/api/character/')
  }, [])

  return (
    <section>
      <div className="container container-fluid">
        <div className="row margin-bottom--24">
            {characters.map(({name, id, image, status, location}) => {
              return (
                <div key={id} className="col-xs-4 margin-bottom--24">
                  <Character
                    id={id}
                    image={image}
                    name={name}
                    status={status}
                    location={location}
                  />
                </div>
              )
            })}
        </div>
      </div>
    </section>
  );
}

export default Home;
