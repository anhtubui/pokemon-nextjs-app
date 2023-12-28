import Head from "next/head";
import React, {useEffect, useState} from "react";
import Type from "@/components/Type";
import Pokemon from "@/components/Pokemon";
import usePagination from "@/helpers/usePagination";

type PokemonDataResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<PokemonIdem>;
}

type TypesDataResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<PokemonType>;
}

type PokemonListType = Array<PokemonIdem>;

const pageSize = 48;

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [pokemonList, setPokemonList] = useState<PokemonListType>([]);
    const [typeList, setTypeList] = useState<Array<PokemonType>>([]);
    const [selectedTypes, setSelectedTypes] = useState<Array<PokemonTypeData>>([]);
    const {paginatedList , paginate, currentPage} = usePagination(pokemonList, pageSize);

    const fetchPokemonList = async () => {
        try {
            const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1200", {
                method: "GET",
            });
            const data: PokemonDataResponse = await res.json();
            setPokemonList(data.results);
        } catch (e) {
            console.error("Error fetching the data:", e);
        }
    };

    const fetchTypeList = async () => {
        try {
            const res = await fetch("https://pokeapi.co/api/v2/type/", {
                method: "GET",
            });
            const data: TypesDataResponse = await res.json();
            setTypeList(data.results);
        } catch (e) {
            console.error("Error fetching the data:", e);
        }
    };

    const handleTypeClick = (type: PokemonTypeData) => {
        if (selectedTypes.includes())

        setPokemonList(type.pokemon.map(({pokemon}) => pokemon));
        paginate(1);
    };

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            Promise.all([fetchPokemonList(), fetchTypeList()]).then(() => setLoading(false));
        };
        fetchData();
    }, []);


    return (
        <div>
            {loading ? "...Loading" : (
                <div className={"mx-auto max-w-screen-xl"}>
                    <div className={"flex items-center mx-4 my-4"}>
                        <div className={"mr-2 my-4 font-bold self-start"}>
                            Types:
                        </div>
                        <div>
                            {typeList.map((type) =>  (
                                <Type
                                    key={type.name}
                                    type={type}
                                    handleTypeClick={handleTypeClick}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={"my-12 mx-4 font-bold"}>{`${pokemonList.length} results found.`}</div>
                </div>
            )}
            {pokemonList.length === 0 ? "No result found" : (
                <div className={"grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4"}>
                    {(paginatedList as PokemonListType).map((pokemon) => <Pokemon pokemon={pokemon} key={pokemon.name} />)}
                </div>
            )}
            <div className={"mt-8 flex justify-center"}>
                <button
                    className={"p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <button
                    className={"p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage*pageSize > pokemonList.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
}