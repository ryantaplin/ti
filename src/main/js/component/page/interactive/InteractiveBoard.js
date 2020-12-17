import React, {useCallback, useState} from 'react';
import InteractiveCard from "./card/InteractiveCard";
import {inRange} from 'lodash';
import InteractiveColumn from "./column/InteractiveColumn";
import {topStartLocationFromOrderIndex, orderFromDragState} from "./Utils";
import {HEIGHT as CARD_HEIGHT} from './card/CardConstant';

export default function InteractiveBoard({boardPrefix, columnData}) {
    const items = ['one', 'two', 'three', 'four', 'five'];
    const [state, setState] = useState({
        order: items, // item order whilst static
        dragOrder: items, // item order whilst dragging
        draggedIndex: null // current drag item index
    });

    const handleDrag = useCallback(({translation, id}) => {
        const delta = Math.round(translation.y / CARD_HEIGHT);
        const index = state.order.indexOf(id);
        const dragOrder = state.order.filter(index => index !== id);

        if (inRange(index + delta, 0, items.length)) {
            console.log("In range...", index, delta);
            console.log("Y", translation.y);

            dragOrder.splice(index + delta, 0, id);
            setState(state => ({
                ...state,
                draggedIndex: id,
                dragOrder
            }));
        }
    }, [state.order, items.length]);

    const handleDragEnd = useCallback(() => {
        setState(state => ({
            ...state,
            order: state.dragOrder,
            draggedIndex: null,
        }));
    }, []);

    const containerStyle = {
        paddingTop: '1rem'
    };

    return (
        <div className="interactive-board" style={containerStyle}>
            <InteractiveColumn index={0} header="READY">
                {items.map(index => {
                    const isDragging = state.draggedIndex === index;
                    const position = {
                        top: topStartLocationFromOrderIndex(index, orderFromDragState(isDragging, state))
                    };
                    const draggableAttribute = {
                        id: index,
                        onDrag: handleDrag,
                        onDragEnd: handleDragEnd
                    };
                    return (
                        <InteractiveCard key={index}
                                         position={position}
                                         isDragging={isDragging}
                                         draggableAttribute={draggableAttribute}>
                            {boardPrefix + "-" + index}
                        </InteractiveCard>

                    )
                })}
            </InteractiveColumn>
        </div>
    );
}