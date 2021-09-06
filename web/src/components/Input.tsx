import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { DateTime } from 'luxon';

const Range = function (props: { min: number, max: number, value: number, minString?: string, maxString?: string, name?: string, onChange?: (name: string, value: string) => void }) {
    const { onChange, minString, maxString, ...passthrough } = props;
    const internalOnChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        onChange && props.name && onChange(props.name, e.target.value);
    }

    return (
        <>
            <span>{props.minString || props.min}</span>
            <input type="range" role="slider" {...passthrough} onChange={internalOnChange} />
            <span>{props.maxString || props.max}</span>
        </>
    )
}

const Text = function (props: { value: string, name?: string, onChange?: (name: string, value: string) => void }) {
    const { onChange, ...passthrough } = props;
    const internalOnChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        onChange && props.name && onChange(props.name, e.target.value);
    }

    return (
        <>
            <input type="text" {...passthrough} onChange={internalOnChange} />
        </>
    )
}

const Date = function (props: { name: string, value: string, onSelect: (name: string, date: string) => void }) {
    const onDayChange = function (day: Date) {
        const dateStr = DateTime.fromJSDate(day).toISO();
        props.onSelect(props.name, dateStr);
    }

    return (
        <DayPickerInput onDayChange={onDayChange} />
    )
}

const Input = { Range, Text, Date };
export default Input;