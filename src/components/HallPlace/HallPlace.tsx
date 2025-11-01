import {
    HALL_PLACE_TYPES_ADMIN,
    HALL_PLACE_TYPES_CLIENT,
    type HallPlaceTypesAdmin,
    type HallPlaceTypesClient
} from "../../config/halls.ts";
import {HALL_PLACE_CLASS_NAME} from "../../config/constants.ts";

interface HallPlaceProps {
    row: number;
    col: number;
    status: (keyof typeof HALL_PLACE_TYPES_ADMIN) | (keyof typeof HALL_PLACE_TYPES_CLIENT);
    hall: string[][];
    // hallPlaceTypes: typeof HALL_PLACE_TYPES_ADMIN | typeof HALL_PLACE_TYPES_CLIENT;
    isAdmin: boolean;
    onPlaceClick: (row: number, col: number) => void;
}

export default function HallPlace({row, col, hall, status, isAdmin, onPlaceClick}: HallPlaceProps) {

    const title = isAdmin ? status as HallPlaceTypesAdmin : status as HallPlaceTypesClient

    return (
        <button className={`${HALL_PLACE_CLASS_NAME} ${HALL_PLACE_CLASS_NAME}_${hall[row][col]}`}
                type="button"
                style={
                    {
                        gridRow: row + 1,
                        gridColumn: col + 1
                    }
                }
                title={title}
                data-type={hall[row][col]}
                onClick={() => {
                    onPlaceClick(row, col)
                }}>
        </button>
    )
}