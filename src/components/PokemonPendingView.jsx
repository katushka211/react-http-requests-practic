import { PokemonDataView } from './PokemonDataView';
import { ImSpinner } from 'react-icons/im';
import pendingImage from './pending.png';
import css from './PokemonPendingView.module.css';

export function PokemonPendingView({ pokemonName }) {
  const pokemon = {
    name: pokemonName,
    sprites: {
      other: {
        'official-artwork': {
          front_default: pendingImage,
        },
      },
    },

    stats: [],
  };

  return (
    <div>
      <div className={css.spinner}>
        <ImSpinner size="32" className="icon-spin" />
        Завантажуємо...
      </div>
      {<PokemonDataView pokemon={pokemon} />}
    </div>
  );
}
