import DayPicker from 'react-day-picker/DayPicker';
import 'react-day-picker/lib/style.css';
import { DayModifiers } from 'react-day-picker/types/Modifiers';
import { DateTime } from 'luxon';
import { createNoSubstitutionTemplateLiteral } from 'typescript';

const Range = function (props: { min: number, max: number, value: number, name?: string, onChange?: (name: string, value: string) => void }) {
    return (
        <>
            <span>{props.min}</span>
            <input type="range" min={props.min} max={props.max} value={props.value} name={props.name} onChange={e => props.onChange && props.onChange(e.target.name, e.target.value)} />
            <span>{props.max}</span>
        </>
    )
}

const Text = function (props: { value: string, name?: string, onChange?: (name: string, value: string) => void }) {
    return (
        <>
            <input type="text" value={props.value} name={props.name} onChange={e => props.onChange && props.onChange(e.target.name, e.target.value)} />
        </>
    )
}

const Date = function (props: {name:string, onSelect: (name: string, date: string) => void }) {
    const onDayClick = function(day: Date, modifiers:DayModifiers): void {
        console.log(day);
        console.log(modifiers);
        // if(modifiers.selected) {
            const dateStr = DateTime.fromJSDate(day).toISO();
            props.onSelect(props.name, dateStr);
        // }
        // TODO update dateinput?
    }

    return (
        <DayPicker onDayClick={onDayClick} />
    )
}

export default { Range, Text, Date }