import React from "react";
import Draggable from "./Draggable";
import { HEIGHT as CARD_HEIGHT, WIDTH as CARD_WIDTH }  from "./CardConstant";

const CARD_FONT_SIZE = 20; //CSS this

export default function InteractiveCard({children, location, draggable}) {

    const containerStyle = {
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,

        fontSize: `${CARD_FONT_SIZE}px`,
        color: '#282c34',

        userSelect: 'none',
        backgroundColor: 'white',
        borderRadius: '5px',

        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',

        position: 'absolute',
        top: `${location.top}px`,
    };

    return (
        <Draggable id={draggable.id} onDrag={draggable.onDrag} onDragEnd={draggable.onDragEnd}>
            <div style={containerStyle}>
                {children}
            </div>
        </Draggable>
    );
}