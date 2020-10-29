import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import ThemeContext from '../context/ThemeContext'
import AppTheme from '../Colors'
import ClearButton from "./ClearButton"
import Form from "./Form";

var poke ='https://pokeapi.co/api/v2/pokemon/'
// function addPoke(name) {
//     var poke = 'https://pokeapi.co/api/v2/pokemon/'+name
//     console.log(poke)
//   }

const POKEMON_DATA={
    species_name: "",
    types_type:"",
    front_sprite:"",
};

function refreshPage() {
    window.location.reload(false);
  }


function Api() {
    const {themeState , handleTheme } = useContext(ThemeContext);
    const currentTheme = AppTheme[themeState]
    const styles = {
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`
    }



    // API Lab Functions

    const [pokeData, setPokeData] = useState(POKEMON_DATA);
    const [loading, setLoading] = useState(false);

    const getPoke = async ()=>{
        var pokelist = ['pikachu', 'charmander', 'bulbasaur', 'snorlax', 'mew']
        var url = poke + pokelist[Math.floor(Math.random()*pokelist.length)]



        setLoading(true);
        const response = await axios.get(url);
        const data = response.data;
        
        //console.log(data)
        var name = (data.name)
        var type = (data.types[0].type.name)
        var sprite = (data.sprites.front_default)
              
     setLoading(false);
     setPokeData({
         name,
         type,
         sprite,
     });

    };  

    useEffect(()=>{
        getPoke();
    },[]);

const { name, type, sprite } = pokeData
  return (
    <div style={styles}>
   
            <h1>My fave random Pokemon!</h1>
            <picture>
                <img src = {sprite}></img>
            </picture>
            <h2>Name: {name} </h2>
            <h2>Type: {type} </h2>

     </div>
  );
}


export default Api;