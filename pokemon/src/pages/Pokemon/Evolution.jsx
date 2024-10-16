/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getPokemonData } from "../../app/reducer/getPokemonData";
import Loader from "../../components/Loader.jsx";
import { getInitialPokemonData } from "../../app/reducer/getInitialPokemonData.js";

function Evolution({ evolution }) {
  const { allPokemon, randomPokemon, loading } = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getInitialPokemonData())
  }, [dispatch])

  useEffect(() => {
    if (Array.isArray(allPokemon) && allPokemon.length > 0) {
      const clonePokemons = [...allPokemon];
      const evolutionChain = clonePokemons.filter((pokemon) => evolution[0].includes(pokemon.name.toLowerCase()));
      console.log("Filtered Evolution Chain:", evolutionChain);
      dispatch(getPokemonData(evolutionChain));
    }
  }, [allPokemon, evolution, dispatch]);


  if (loading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="w-full">
        <div className=" mt-10 md:ml-20 rounded-sm bg-primary-card/60 h-fit w-80 px-4 py-4 text-left relative before:content[''] before:rounded-tl-sm before:h-1 before:w-40 before:bg-card-border before:absolute before:top-0 before:left-0">
          <div className="text-card uppercase text-3xl font-semibold ">
            <span>Evolution</span>
          </div>
        </div>
      </div>

      <div className="evolution-list mt-4 flex flex-col md:flex-row w-full justify-evenly items-center flex-1 mb-20 md:mb-0">
        {
          randomPokemon.map((pokemon) => {
            return (
              <div key={pokemon.id} className="flex flex-col" >
                <div className="md:ml-20 rounded-sm bg-primary-card/60 h-fit w-48 px-4 py-4 text-left relative before:content[''] before:rounded-tl-sm before:h-1 before:w-16 before:bg-card-border before:absolute before:top-0 before:left-0">
                  <div className="text-card uppercase text-xl font-semibold ">
                    <span>{pokemon.name}</span>
                  </div>
                </div>
                <img src={pokemon.image} alt={pokemon.name} className=" w-72 aspect-square" />
              </div>
            )
          })
        }
      </div>

    </div>
  );
}

export default Evolution;
