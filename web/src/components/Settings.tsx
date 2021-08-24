import styled from 'styled-components';
import { SettingsInterface } from '../types';
import Input from './Input';

const SettingsWrapper = styled.div`
position: relative;
z-index: 1;
`;

export default function Settings({ settings, onUpdate }: { settings: SettingsInterface, onUpdate: (key: string, value: string) => void }) {

    return (
        <SettingsWrapper>
            <h3>Settings</h3>
            <Input.Date name="start" onSelect={onUpdate} />
            <Input.Text name="start" value={settings.start} onChange={onUpdate} />
            <Input.Text name="end" value={settings.end} onChange={onUpdate} />
            <Input.Range name="magnitude" min={0} max={10} value={settings.magnitude} onChange={onUpdate} />
            <Input.Range name="speed" min={0} max={10} value={settings.speed} onChange={onUpdate} />
        </SettingsWrapper>
    )
}