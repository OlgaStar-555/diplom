import './InputNumber.css'

interface InputNumberProps {
    value: number;
    handleChange: (value: number) => void;
    id: string;
    title?: string;
    classItem?: string;
}

export default function InputNumber({
                                        value,
                                        handleChange,
                                        id,
                                        title,
                                        classItem = '',
                                    }: InputNumberProps) {
    return (
        <label htmlFor={id} className={`box box_input-number${classItem?.length > 0 && ` ${classItem}`}`}>
            {title && <h6 className="input-number__title">{title}</h6>}
            <input id={id} type="number"
                   className="input-number__field"
                   value={value}
                   onChange={({target}) => {
                       handleChange(parseInt(target.value))
                   }}
            />
        </label>
    )

}