import InputNumber from "../../../Components/InputNumber/InputNumber.tsx";
import {HALL_PLACE_CLASS_NAME} from "../../../../../config/constants.ts";

interface HallSizesProps {
    priceStandart: number;
    priceVip: number;
    setPriceStandart: (newCount: number) => void;
    setPriceVip: (newCount: number) => void;
}

export default function HallSizes({priceStandart, priceVip, setPriceStandart, setPriceVip}: HallSizesProps) {

    const ID_PREFIX = 'price-'
    const STATUS_0 = 'standart'
    const STATUS_1 = 'vip'
    const TITLE = 'Цена, рублей'

    const handleChange = (targetVal: number, setValue: (newCount: number) => void) => {
        if (!isNaN(targetVal) && targetVal >= 0) {
            setValue(targetVal);
        }
    }

    return (
        <div className="box box_price-control">
            <div className="price-control__item">
                <InputNumber value={priceStandart}
                             handleChange={(targetVal) => {
                                 handleChange(targetVal, setPriceStandart)
                             }}
                             id={`${ID_PREFIX}${STATUS_0}`}
                             title={TITLE}
                             classItem='box_price'/>
                <div className="price-control__description">
                    <span className="description__txt"> за </span>
                    <span className={`${HALL_PLACE_CLASS_NAME} ${HALL_PLACE_CLASS_NAME}_${STATUS_0}`}></span>
                    <span className="description__txt"> обычные кресла</span>
                </div>

            </div>
            <div className="price-control__item">
                <InputNumber value={priceVip}
                             handleChange={(targetVal) => {
                                 handleChange(targetVal, setPriceVip)
                             }}
                             id={`${ID_PREFIX}${STATUS_1}`}
                             title={TITLE}
                             classItem='box_price'/>
                <div className="price-control__description">
                    <span className="description__txt"> за </span>
                    <span className={`${HALL_PLACE_CLASS_NAME} ${HALL_PLACE_CLASS_NAME}_${STATUS_1}`}></span>
                    <span className="description__txt"> VIP кресла</span>
                </div>
            </div>
        </div>
    )
}