import { SettingsInterface } from '../types';
import styled from 'styled-components';

export default function Info(props: { settings: SettingsInterface }) {

    const InfoWrapper = styled.div`
        position: relative;
        z-index: 1;
    `;
    return (
        <InfoWrapper>
            <h3>Info:</h3>
            {
                Object.keys(props.settings).map(k => {
                    const key: 'start' | 'end' | 'magnitude' = k as 'start' | 'end' | 'magnitude';
                    
                    return (
                        <div key={k}>{k}: {props.settings[key]}</div>
                    )
                })
            }
        </InfoWrapper>
    )
}