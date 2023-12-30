declare type NamedAPIResource  = {
    name: string;
    url: string;
}

declare type PokemonIdem = NamedAPIResource ;

declare type PokemonType = NamedAPIResource ;

declare type PokemonTypeData = {
    id: number;
    damage_relations: {
        double_damage_from: Array<PokemonType>;
        double_damage_to: Array<PokemonType>;
        half_damage_from: Array<PokemonType>;
        half_damage_to: Array<PokemonType>;
        no_damage_from: Array<PokemonType>;
        no_damage_to: Array<PokemonType>;
    };
    game_indices: Array<{
        game_index: number;
        generation: NamedAPIResource ;
    }>;
    generation: NamedAPIResource ;
    move_damage_class: any;
    moves: Array<NamedAPIResource >;
    name: string;
    names: Array<{
        language: NamedAPIResource ;
        name: string;
    }>;
    past_damage_relations: any;
    pokemon: Array<{
        pokemon: PokemonIdem;
        slot: number;
    }>;
};

declare type PokemonData = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Array<any>;
    forms: Array<NamedAPIResource>;
    game_indices: Array<any>;
    held_items: Array<any>;
    location_area_encounters: string;
    moves: Array<any>;
    past_types: Array<any>;
    sprites: any;
    species: NamedAPIResource;
    stats: Array<any>;
    types: Array<{
        slot: number;
        type: PokemonType;
    }>;
};
