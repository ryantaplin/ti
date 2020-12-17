import React from "react";
import {WIDTH as COLUMN_WIDTH, LEFT_PADDING as COLUMN_LEFT_PAD} from "./ColumnConstant";

export default function InteractiveColumn({index, header, children }) {

    const containerStyle = {
        minHeight: '90vh', //this has to be reflective of all components (i.e header/footer inclusive)
        maxHeight: '90vh', //this has to be reflective of all components (i.e header/footer inclusive)

        minWidth: `${COLUMN_WIDTH}px`,

        padding: '.5rem',
        borderRadius: '5px',
        backgroundColor: '#49505e',
        position: 'absolute',
        left: `${(index * COLUMN_WIDTH) + 10 + (index > 0 ? COLUMN_LEFT_PAD : 0)}px`,
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
