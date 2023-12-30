import React, {useEffect, useState} from "react";
import classNames from "classnames";
import useSWR from "swr";
import fetcher from "@/helpers/fetcher";

type Props = {
    type: PokemonType;
    handleTypeClick: (type: PokemonTypeData) => void;
    selectedTypes?: Array<PokemonTypeData>;
}

export default function Type ({type, handleTypeClick, selectedTypes}: Props) {
    const {data: typeData} = useSWR<PokemonTypeData>(type.url, fetcher, { dedupingInterval: 60000 });

    const selected = Boolean(typeData?.id && selectedTypes?.some((selectedType) => selectedType.id === typeData.id));

    return typeData ? (
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
    ) : "";
}
