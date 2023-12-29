import React, {useEffect, useState} from "react";
import classNames from "classnames";

type Props = {
    type: PokemonType;
    handleTypeClick: (type: PokemonTypeData) => void;
    selectedTypes?: Array<PokemonTypeData>;
}

export default function Type ({type, handleTypeClick, selectedTypes}: Props) {
    const [typeData, setTypeData] = useState<PokemonTypeData>({} as PokemonTypeData);

    const selected = Boolean(typeData.id && selectedTypes?.some((selectedType) => selectedType.id === typeData.id));

    useEffect(() => {
        fetch(type.url, {method: "GET"})
            .then((res) => res.json())
            .then((data: PokemonTypeData) => setTypeData(data));
    }, [type.url]);

    return (
        <button
            key={type.name}
            className={classNames("px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold", {
                "text-red-900": !selected,
                "text-white bg-red-900": selected,
            })}
            onClick={() => handleTypeClick(typeData)}
        >
            {type.name}
        </button>
    );
}
