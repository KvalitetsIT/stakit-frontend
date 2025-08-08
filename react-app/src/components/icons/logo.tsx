import { createSvgIcon } from '@mui/material/utils';

export const Bell = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>,
    'Bell'
);


export const Logo2 = createSvgIcon(
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 240"
        enableBackground={"new 0 0 512 240"}
        xmlSpace="preserve"
        x="0px" y="0px"
        width={"100%"}
    >
        <g>
            <g>
                <path style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    fill: "#00FFDE",

                }} d="M427,46.5H316.6c-1.4,0-2.6,1.2-2.6,2.6V77c0,1.4,1.2,2.6,2.6,2.6h36.1c1.4,0,2.6,1.2,2.6,2.6v108.8
                c0,1.4,1.2,2.6,2.6,2.6h27.9c1.4,0,2.6-1.2,2.6-2.6V82.1c0-1.4,1.2-2.6,2.6-2.6H427c1.4,0,2.6-1.2,2.6-2.6V49.1
                C429.6,47.7,428.5,46.5,427,46.5z M197.6,50.4c1-1.7-0.2-3.9-2.2-3.9l-30.8,0c-1.8,0-3.6,1-4.5,2.6l-37.1,64
                c-2.5,4.3-2.5,9.5,0,13.8l37.1,64c0.9,1.6,2.6,2.6,4.5,2.6l30.8,0c2,0,3.2-2.2,2.2-3.9l-36.3-62.7c-2.5-4.3-2.5-9.5,0-13.8
                L197.6,50.4z M270.1,46.5h-27.9c-1.4,0-2.6,1.2-2.6,2.6v141.8c0,1.4,1.2,2.6,2.6,2.6h27.9c1.4,0,2.6-1.2,2.6-2.6V49.1
                C272.7,47.7,271.6,46.5,270.1,46.5z M112.8,160.1H85c-1.4,0-2.6,1.2-2.6,2.6v28.3c0,1.4,1.2,2.6,2.6,2.6h27.9
			c1.4,0,2.6-1.2,2.6-2.6v-28.3C115.4,161.2,114.2,160.1,112.8,160.1z"/>
            </g>
        </g>
    </svg>, "Logo"
)

export const Logo = () => (
    <>
        <img width={"100"} height={"100%"} src='/assets/icons/logo.svg' />
    </>

)