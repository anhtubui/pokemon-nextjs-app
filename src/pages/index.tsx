import React, {useEffect, useState} from "react";

import Type from "@/components/Type";
import Pokemon from "@/components/Pokemon";
import usePagination from "@/helpers/usePagination";

type PokemonListType = Array<PokemonIdem>;
type TypeListType = Array<PokemonType>;

export interface PokemonDataResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListType;
}

export interface TypesDataResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: TypeListType;
}

const pageSize = 48;

const getPokemonListFromTypes = (types: Array<PokemonTypeData>) => {
    if (types.length === 0) {
        return [];
    }

    const initialList = types[0].pokemon.map(({pokemon}) => pokemon);
    if (types.length === 1) {
        return initialList;
    }

    return types.reduce((acc, crr) => {
        // create a map from the coming array
        const lookup = new Set(crr.pokemon.map(({pokemon}) => pokemon.name));

        // return the list of common objects
        return acc.filter(({name}) => lookup.has(name));
    }, initialList);
};

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [pokemonResponse, setPokemonResponse] = useState<PokemonDataResponse | undefined>(undefined);
    const [pokemonList, setPokemonList] = useState<PokemonListType>([]);
    const [typeList, setTypeList] = useState<TypeListType>([]);
    const [selectedTypes, setSelectedTypes] = useState<Array<PokemonTypeData>>([]);

    const {paginatedList , paginate, currentPage} = usePagination(pokemonList, pageSize);

    const fetchPokemonList = async () => {
        try {
            const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1200", {
                method: "GET",
            });
            const data: PokemonDataResponse = await res.json();
            setPokemonResponse(data);
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
        if (selectedTypes.length !== 0 && selectedTypes.some((selectedType) => selectedType.id === type.id)) {
            setSelectedTypes((prevTypes) => prevTypes.filter((prevType) => prevType.id !== type.id));
        } else {
            setSelectedTypes((prevTypes) => [...prevTypes, type]);
        }
        paginate(1);
    };


    useEffect(() => {
        const fetchData = () => {
            Promise.all([fetchPokemonList(), fetchTypeList()]).then(() => setLoading(false));
        };
        fetchData();
    }, []);

    useEffect(() => {
        if(selectedTypes.length === 0) {
            if (pokemonResponse) setPokemonList(pokemonResponse.results);
        } else {
            setPokemonList(getPokemonListFromTypes(selectedTypes));
        }
    }, [selectedTypes]);

    return (
        <div>
            {loading ? "Loading" : (
                <div className={"mx-auto max-w-screen-xl"}>
                    <div className={"flex items-center mx-4 my-4"}>
                        <div className={"mr-2 my-4 font-bold self-start"}>
                            {"Types:"}
                        </div>
                        <div>
                            {typeList.map((type) =>  (
                                <Type
                                    key={type.name}
                                    type={type}
                                    handleTypeClick={handleTypeClick}
                                    selectedTypes={selectedTypes}
                                />
                            ))}
                        </div>
                    </div>
                    {pokemonList.length > 0 && <div className={"my-12 mx-4 font-bold"}>{`${pokemonList.length} results found.`}</div>}
                </div>
            )}
            {pokemonList.length === 0 ? (
                <div className={"text-center text-3xl mx-auto my-24 font-bold"}>
                    {"No results found."}
                </div>
                ) : (
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
                    {"Prev"}
                </button>
                <button
                    className={"p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage*pageSize > pokemonList.length}
                >
                    {"Next"}
                </button>
            </div>
        </div>
    );
}
