import React, {useEffect, useState} from "react";
import Image from "next/image";

type Props = {
    pokemon: PokemonIdem;
}

export default function Pokemon ({pokemon}: Props) {
    const [pokemonData, setPokemonData] = useState<PokemonData>({} as PokemonData);

    useEffect(() => {
        fetch(pokemon.url, {method: "GET"})
            .then((res) => res.json())
            .then((data: PokemonData) => setPokemonData(data));
    }, [pokemon.url]);

    return (
        <div>
            {pokemonData.id && (
                <div className={"h-24 w-24 mx-auto"}>
                    <Image
                        width={96}
                        height={96}
                        loading={"lazy"}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
                        alt={pokemon.name}
                    />
                </div>
            )}
            <div className={"text-center"}>{pokemon.name}</div>
        </div>
    );
}
