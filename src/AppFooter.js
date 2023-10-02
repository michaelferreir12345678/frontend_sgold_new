import React from 'react';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer">
            by
            {/* <span className="font-medium ml-2">Instituto de tecnologia da informação e comunicação</span> */}
            <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-ITIC-com-nome-lado.jpg' : 'assets/layout/images/logo-ITIC-com-nome-lado.jpg'} alt="Logo" style={{marginLeft:"15px"}} height="40" className="mr-2" />
        </div>
    );
}
