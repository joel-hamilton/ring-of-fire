import styled from 'styled-components';
import { SettingsInterface } from '../types';
import Input from './Input';

const SettingsWrapper = styled.div`
    position: relative;
    z-index: 1;

    h3, span {
        color: #fafafa;
    }
`;

export default function Settings({ settings, onUpdate }: { settings: SettingsInterface, onUpdate: (key: string, value: string) => void }) {

    return (
        <SettingsWrapper>
            <h3>Settings</h3>
            <Input.Date name="start" value={settings.start} onSelect={onUpdate} />
            <Input.Date name="end" value={settings.start} onSelect={onUpdate} />
            <Input.Range name="magnitude" min={0} max={10} value={settings.magnitude} onChange={onUpdate} />
            <Input.Range name="speed" min={0} max={10} value={settings.speed} onChange={onUpdate} />
        </SettingsWrapper>
    )
}