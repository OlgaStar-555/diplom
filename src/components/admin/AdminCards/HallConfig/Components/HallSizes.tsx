import InputNumber from "../../../Components/InputNumber/InputNumber.tsx";

interface HallSizesProps {
    rowCount: number;
    colCount: number;
    setRowCount: (newCount: number) => void;
    setColCount: (newCount: number) => void;
    createNewArr: (numRows: number, numCols: number) => void;
}

export default function HallSizes({rowCount, colCount, setRowCount, setColCount, createNewArr}: HallSizesProps) {

    const handleChange = (targetVal: number, isRow: boolean, setValue: (newCount: number) => void) => {
        if (!isNaN(targetVal) && targetVal > 0) {
            setValue(targetVal);

            if (isRow) {
                createNewArr(targetVal, colCount)
            } else {
                createNewArr(rowCount, targetVal)
            }
        }
    }

    return (
        <div className="row row_sizes">
            <InputNumber value={rowCount}
                         handleChange={(targetVal) => {
                             handleChange(targetVal, true, setRowCount)
                         }}
                         id='row-size'
                         title='Рядов, шт'
                         classItem={'box_size'}/>
            <InputNumber value={colCount}
                         handleChange={(targetVal) => {
                             handleChange(targetVal, false, setColCount)
                         }}
                         id='col-size'
                         title='Мест, шт, шт'
                         classItem={'box_size'}/>


        </div>
    )
}