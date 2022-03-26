import { createGlobalStyle} from "styled-components";

const GlobalStyes = createGlobalStyle`
    @font-face {
    font-family: 'ROKAFSlabSerifBold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts2201-3@1.0/ROKAFSlabSerifBold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    }

    body {
        font-family: 'ROKAFSlabSerifBold';
    }
`;

export default GlobalStyes;