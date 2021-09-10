/* FOOTER - Has covid details and a basic footer for the website */

import './styles/Footer.css';

export default function Footer(){
    return(
        <div className = "footerWrapper">
            <div class="footerContent">
                <div class="vcFoot">Vibe Check</div>
                    <div class="covid">
                        <div>Coronavirus Health Information Line 1800 020 080</div>
                        <div>Business Help Hotline 13 28 46</div>
                        <div>Consular Assistance Call +61 2 6261 3305 (overseas) / 1300 555 135 (within Australia)</div>
                    </div>
            </div>
        </div>
    );
}