import { UseCounter } from '../hooks/UseCounter';
import { UsePokemon } from '../hooks/UsePokemon';

export const PokemonPage = () => {
  const { counter, increment, decrement } = UseCounter();
  const { Pokemon, isLoading, FormattedId } = UsePokemon({ id: counter });

  if (isLoading) {
    return (
      <div className='bg-gradient flex flex-col items-center'>
        <h1 className='text-2xl font-thin text-white'>Pokémon</h1>
        <h3 className='text-xl font-bold text-white'>Cargando...</h3>
      </div>
    );
  }
  if (!Pokemon) {
    return (
      <div className='bg-gradient flex flex-col items-center'>
        <h1 className='text-2xl font-thin text-white'>Pokémon</h1>
        <h3 className='text-xl font-bold text-white'>No encontrado</h3>
      </div>
    );
  }
  return (
    <div className='bg-gradient flex flex-col items-center'>
      <h1 className='text-2xl font-thin text-white'>Pokémon</h1>
      <h3 className='text-xl font-bold text-white'>
        #{FormattedId} {Pokemon.name}
      </h3>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${counter}.png`}
        alt={Pokemon?.name}
      />

      <div className='flex gap-2'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'
          onClick={decrement}
        >
          Anterior
        </button>

        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'
          onClick={increment}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
