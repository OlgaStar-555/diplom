export const HALL_PLACE_TYPES_ADMIN = {
    standart: 'обычные кресла',
    vip: 'VIP кресла',
    disabled: 'заблокированные (нет кресла)'
}

export const hallPlaceTypesAdmin = Object.keys(HALL_PLACE_TYPES_ADMIN) as (keyof typeof HALL_PLACE_TYPES_ADMIN)[];

console.log('hallPlaceTypesAdmin')

console.log(hallPlaceTypesAdmin)


export type HallPlaceTypesAdmin = keyof typeof HALL_PLACE_TYPES_ADMIN;


export const HALL_PLACE_TYPES_CLIENT = {
    standart: 'Свобдно',
    vip: 'Свобдно VIP',
    taken: 'Занято',
    active: 'Выбрано'
}

export const hallPlaceTypesClient = Object.keys(HALL_PLACE_TYPES_CLIENT) as (keyof typeof HALL_PLACE_TYPES_CLIENT)[];

export type HallPlaceTypesClient = keyof typeof HALL_PLACE_TYPES_CLIENT;

