import React from "react";

export default function InteractiveColumn({index, header, children }) {

    const COL_WIDTH = 205;
    const COL_PAD = 25;

    const containerStyle = {
        minHeight: '90vh', //this has to be reflective of all components (i.e header/footer inclusive)
        maxHeight: '90vh', //this has to be reflective of all components (i.e header/footer inclusive)

        minWidth: `${COL_WIDTH}px`,

        padding: '.5rem',
        borderRadius: '5px',
        backgroundColor: '#49505e',
        position: 'absolute',
        left: `${(index * COL_WIDTH) + 10 + (index > 0 ? COL_PAD : 0)}px`,
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
