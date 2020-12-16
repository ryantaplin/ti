import React from "react";

export default function InteractiveColumn({header, children}) {

    const containerStyle = {
        minHeight: '95vh', //this has to be reflective of all components (i.e header/footer inclusive)
        maxHeight: '95vh', //this has to be reflective of all components (i.e header/footer inclusive)

        padding: '.5rem',
        borderRadius: '5px',
        backgroundColor: '#49505e',
    };

    const headerStyle = {
        height: '1.5rem',
        marginBottom: '.5rem',

        fontSize: '1.2rem',
        color: 'white'
    };

    const subContainerStyle = {

    };

    return (
        <div style={containerStyle} className="interactive-column">
            <div style={headerStyle}>
                {header}
            </div>
            <div style={subContainerStyle}>
                {children}
            </div>
        </div>
    );
}
