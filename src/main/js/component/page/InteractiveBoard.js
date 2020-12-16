import React, {useCallback, useState} from 'react';
import InteractiveCard from "./interactive/InteractiveCard";
import {inRange} from 'lodash';
import InteractiveColumn from "./interactive/InteractiveColumn";

const CARD_HEIGHT = 100;

export default function InteractiveBoard({boardPrefix, columnData}) {
    const items = ['one', 'two', 'three', 'four', 'five'];
    const [state, setState] = useState({
        order: items, // item order whilst static
        dragOrder: items, // item order whilst dragging
        draggedIndex: null // current drag item index
    });

    const handleDrag = useCallback(({translation, id}) => {
        const delta = Math.round(translation.y / 100);
        const index = state.order.indexOf(id);
        const dragOrder = state.order.filter(index => index !== id);

        if (inRange(index + delta, 0, items.length)) {
            console.log("In range...", index, delta);
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

    const topLocation = (isDragging, index) => {
        return isDragging ? state.order.indexOf(index) * (CARD_HEIGHT + 10) : state.dragOrder.indexOf(index) * (CARD_HEIGHT + 10)
    };

    const containerStyle = {
        display: 'grid',
        padding: '.5rem .5rem 0 .5rem',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: 'repeat(auto-fill, 220px)',
        gap: '.5rem',
    };

    return (
        <div className="interactive-board" style={containerStyle}>
            <InteractiveColumn header="one">
                {items.map(index => {
                    const isDragging = state.draggedIndex === index;
                    return (
                        <InteractiveCard key={index}
                                         location={{top: topLocation(isDragging, index)}}
                                         isDragging={isDragging}
                                         draggable={{id: index, onDrag: handleDrag, onDragEnd: handleDragEnd}}>
                            {boardPrefix + "-" + index}
                        </InteractiveCard>

                    )
                })}
            </InteractiveColumn>
            <InteractiveColumn header="two">
                {items.map(index => {
                    const isDragging = state.draggedIndex === index;
                    return (
                        <InteractiveCard key={index}
                                         location={{top: topLocation(isDragging, index)}}
                                         isDragging={isDragging}
                                         draggable={{id: index, onDrag: handleDrag, onDragEnd: handleDragEnd}}>
                            {boardPrefix + "-" + index}
                        </InteractiveCard>

                    )
                })}
            </InteractiveColumn>
        </div>
    );
}