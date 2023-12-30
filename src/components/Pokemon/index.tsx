import React from "react";
import useSWR from "swr";
import fetcher from "@/helpers/fetcher";

type Props = {
    pokemon: PokemonIdem;
}

export default function Pokemon ({pokemon}: Props) {
    const {data} = useSWR<PokemonData>(pokemon.url, fetcher, { dedupingInterval: 60000 });

    return (
        <div>
            <div className={"h-24 w-24 mx-auto"}>
                {data ? (
                    <img
                        width={96}
                        height={96}
                        loading={"lazy"}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
                        onError={(e) => e.currentTarget.src = ""}
                        alt={pokemon.name}
                    />
                ) : "Loading..."}
            </div>
            <div className={"text-center"}>{pokemon.name}</div>
        </div>
    );
}
