import React, {useEffect, useState} from "react";

type Props = {
    type: PokemonType;
    handleTypeClick: (type: PokemonTypeData) => void;
}

export default function Type ({type, handleTypeClick}: Props) {
    const [typeData, setTypeData] = useState<PokemonTypeData>({} as PokemonTypeData);

    useEffect(() => {
        fetch(type.url, {method: "GET"})
            .then((res) => res.json())
            .then((data: PokemonTypeData) => setTypeData(data));
    }, [type.url]);

    return (
        <button
            key={type.name}
            className={"px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold text-red-900"}
            onClick={() => handleTypeClick(typeData)}
        >
            {type.name}
        </button>
    );
}
