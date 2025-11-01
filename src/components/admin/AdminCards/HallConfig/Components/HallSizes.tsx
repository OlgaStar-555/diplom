interface HallSizesProps {
    rowCount: number;
    colCount: number;
    setRowCount: (newCount: number) => void;
    setColCount: (newCount: number) => void;
    createNewArr: (numRows: number, numCols: number) => void;
}

export default function HallSizes({rowCount, colCount, setRowCount, setColCount, createNewArr}: HallSizesProps) {

    const handleChange = (targetVal: string, isRow: boolean, setValue: (newCount: number) => void) => {
        console.log('handleChange')
        const newValue = parseInt(targetVal);
        if (!isNaN(newValue) && newValue > 0) {
            setValue(newValue);

            if (isRow) {
                createNewArr(newValue, colCount)
            } else {
                createNewArr(rowCount, newValue)
            }
        }
    }

    return (
        <div className="row row_sizes">
            <label htmlFor="row-size" className="box box_size">
                <h6 className="box-size__title">Рядов, шт</h6>
                <input id="row-size" type="number"
                       className="box-size__field"
                       value={rowCount}
                       onChange={({target}) => {
                           handleChange(target.value, true, setRowCount)
                       }}
                />
            </label>
            <label htmlFor="col-size" className="box box_size">
                <h6 className="box-size__title">Мест, шт</h6>
                <input id="col-size" type="number"
                       className="box-size__field"
                       value={colCount || ''}
                       onChange={({target}) => {
                           handleChange(target.value, false, setColCount)
                       }}
                />
            </label>
        </div>
    )
}