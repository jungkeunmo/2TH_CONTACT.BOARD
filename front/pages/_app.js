import React from "react";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import GlobalStyle from "../styles/globalStyles";

const AppShell =({Component}) => {
    return (
        <> 
            <GlobalStyle />
            <Component />
        </>
    );
};

export default AppShell;