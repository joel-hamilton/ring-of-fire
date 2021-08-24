import { SettingsInterface } from '../types';
import styled from 'styled-components';

const InfoWrapper = styled.div`
position: relative;
z-index: 1;
`;

export default function Info({ settings }: { settings: SettingsInterface }) {
    return (
        <InfoWrapper>
            <h3>Info:</h3>
            {
                Object.keys(settings).map(k => {
                    const key: 'start' | 'end' | 'magnitude' = k as 'start' | 'end' | 'magnitude';

                    return (
                        <div key={k}>{k}: {settings[key]}</div>
                    )
                })
            }
        </InfoWrapper>
    )
}