import { TSignUpSchema, signUpSchema } from "./lib/types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import Select from "./components/Select";
import { client } from "./api/client";
import Modal, { PokemonSprites } from "./components/Modal";

function App() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const [pokemons, setPokemons] = useState<
    { name: string; sprites: { versions: PokemonSprites } }[]
  >([]);
  const selectedPokemon = watch("selectedPokemon", []);
  const onSubmit = async (data: TSignUpSchema) => {
    const pokemonsRes = await Promise.all(
      selectedPokemon.map(async (pokemon) => {
        const res = await client.get(`pokemon/${pokemon}`);
        return res.data;
      })
    );
    setPokemons(pokemonsRes);
    setIsModalOpen(true);
  };
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  useEffect(() => {
    const getPokemonsList = async () => {
      const res = await client.get("pokemon?limit=100000&offset=0");
      console.log({ res });
      setPokemonList(
        res.data.results.map((pokemon: { name: string }) => pokemon.name)
      );
    };
    getPokemonsList();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="w-full h-[100vh] flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 w-md p-4 h-96 border rounded mt-[5%]"
      >
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className="border px-4 py-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <input
          {...register("surname")}
          type="text"
          placeholder="Surname"
          className="border px-4 py-2 rounded"
        />
        {errors.surname && (
          <p className="text-red-500 text-sm">{errors.surname.message}</p>
        )}
        <Controller
          name="selectedPokemon"
          control={control}
          defaultValue={[]}
          render={({ field }) => <Select list={pokemonList} {...field} />}
        />
        {errors.selectedPokemon && (
          <p className="text-red-500 text-sm">
            {errors.selectedPokemon.message}
          </p>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-green-500 disabled:bg-gray-400 py-2 rounded text-black mt-auto"
        >
          Submit
        </button>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pokemons={pokemons}
      />
    </div>
  );
}

export default App;
