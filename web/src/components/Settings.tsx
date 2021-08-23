import styled from 'styled-components';
import { isPropertyAssignment } from 'typescript';
import { SettingsInterface } from '../types';
export default function Settings(props: { settings: SettingsInterface, onUpdate: Function }) {

    const SettingsWrapper = styled.div`
    position: relative;
    z-index: 1;
`;

    return (
        <SettingsWrapper>
            <h3>Settings</h3>
            <input type="text" name="start" value={props.settings.start} onChange={e => props.onUpdate(e.target.name, e.target.value)} />
            <input type="text" name="end" value={props.settings.end} onChange={e => props.onUpdate(e.target.name, e.target.value)} />
            <input type="text" name="magnitude" value={props.settings.magnitude} onChange={e => props.onUpdate(e.target.name, e.target.value)} />
            <input type="text" name="speed" value={props.settings.speed} onChange={e => props.onUpdate(e.target.name, e.target.value)} />
        </SettingsWrapper>
    )
}