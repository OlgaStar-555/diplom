import './Legend.css'

import {
    type HallPlaceTypesAdmin, type HallPlaceTypesClient,
    HALL_PLACE_TYPES_ADMIN, HALL_PLACE_TYPES_CLIENT
} from "../../config/halls.ts";
import {HALL_PLACE_CLASS_NAME} from "../../config/constants.ts";


type HallPlaceTypes = HallPlaceTypesAdmin | HallPlaceTypesClient

interface LegendProps {
    hallPlaceTypes: (keyof typeof HALL_PLACE_TYPES_ADMIN)[] | (keyof typeof HALL_PLACE_TYPES_CLIENT)[];
    hallPlaceTypesRu: typeof HALL_PLACE_TYPES_ADMIN | typeof HALL_PLACE_TYPES_CLIENT;
}
export default function Legend({hallPlaceTypes, hallPlaceTypesRu} :LegendProps) {
    return (
        <ul className="legend__list">
            {hallPlaceTypes.map((item: HallPlaceTypes) => {
                const key = item as keyof typeof hallPlaceTypesRu

                return (
                    <li key={key} className="legend-item">
                        <div className={`${HALL_PLACE_CLASS_NAME} ${HALL_PLACE_CLASS_NAME}_${item}`}></div>
                        <h6 className="legend-item__title">
                            &nbsp;—&nbsp;{hallPlaceTypesRu[key]}
                        </h6>
                    </li>
                )
            })
            }
        </ul>
    )
}