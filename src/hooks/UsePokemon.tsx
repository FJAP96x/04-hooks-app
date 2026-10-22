import { useState, useEffect } from 'react';

interface Props {
  id: number;
}

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

export const UsePokemon = ({ id }: Props) => {
  const [Pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPokemonById = async (id: number) => {
    setIsLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    setPokemon({
      id: id,
      name: data.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getPokemonById(id);
  }, [id]);

  return {
    //properties
    Pokemon,
    isLoading,

    //method

    FormattedId: id.toString().padStart(3, '0'),
  };
};
