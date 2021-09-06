import styled from 'styled-components';
import { SettingsInterface } from '../types';
import Input from './Input';
import { DateTime } from 'luxon';

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
            {/* <Input.Date name="start" value={settings.start} onSelect={onUpdate} /> */}
            {/* <Input.Date name="end" value={settings.start} onSelect={onUpdate} /> */}
            <Input.Range
                name="date"
                min={DateTime.fromISO('1995-01-01').toMillis()} 
                max={DateTime.now().toMillis()} 
                minString={DateTime.fromISO('1995-01-01').toFormat('yyyy-MM-dd')}
                maxString={DateTime.now().toFormat('yyyy-MM-dd')}
                value={DateTime.fromISO(settings.start).toMillis()} 
                onChange={(_, ms) => onUpdate('start', DateTime.fromMillis(parseInt(ms)).toFormat('yyyy-MM-dd'))} />
            <Input.Range name="magnitude" min={0} max={10} value={settings.magnitude} onChange={onUpdate} />
            <Input.Range name="speed" min={0} max={10} value={settings.speed} onChange={onUpdate} />
        </SettingsWrapper>
    )
}