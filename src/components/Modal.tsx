interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemons: { name: string; sprites: { versions: PokemonSprites } }[];
}

type PokemonSpriteGeneration =
  | "red-blue"
  | "yellow"
  | "crystal"
  | "gold"
  | "silver"
  | "emerald"
  | "firered-leafgreen"
  | "ruby-sapphire"
  | "diamond-pearl"
  | "heartgold-soulsilver"
  | "platinum"
  | "black-white"
  | "omegaruby-alphasapphire"
  | "x-y"
  | "ultra-sun-ultra-moon"
  | "icons";

export type PokemonGeneration =
  | "generation-i"
  | "generation-ii"
  | "generation-iii"
  | "generation-iv"
  | "generation-v"
  | "generation-vi"
  | "generation-vii"
  | "generation-viii";

export type PokemonSprites = {
  [generation in PokemonGeneration]: {
    [key in PokemonSpriteGeneration]?: {
      front_default: string;
      front_shiny?: string;
      back_default?: string;
      back_shiny?: string;
    };
  };
};

const Modal = ({ isOpen, onClose, pokemons }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="w-[1500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-10">
        <div className="max-h-[500px] overflow-y-auto p-2">
          {pokemons.map((pokemon) => (
            <div key={pokemon.name} className="border-b pb-2 mb-4">
              <h2 className="text-xl font-bold text-center">{pokemon.name}</h2>

              {Object.keys(pokemon.sprites.versions).map((generation) => {
                const sprites =
                  pokemon.sprites.versions[generation as PokemonGeneration];

                return (
                  <div key={generation} className="mb-4">
                    {/* Generation Header */}
                    <h3 className="text-lg font-semibold text-gray-700 capitalize border-b pb-1 mb-2">
                      {generation.replace("-", " ")}
                    </h3>

                    {/* Sprites Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {Object.keys(sprites).map((spriteKey) => {
                        const sprite =
                          sprites[spriteKey as PokemonSpriteGeneration];

                        return (
                          <div key={spriteKey} className="text-center">
                            <p className="font-medium">{spriteKey}</p>
                            {sprite?.front_default && (
                              <img
                                src={sprite.front_default}
                                alt={`${pokemon.name} ${spriteKey}`}
                                className="w-20 h-20 mx-auto"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Close button */}
        <div className="flex justify-center mt-4">
          <button
            className="p-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            Close Modal
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
