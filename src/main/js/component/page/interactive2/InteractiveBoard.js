import React, {useEffect, useRef, useState} from 'react';
import InteractiveColumnHeader from "./column/InteractiveColumnHeader";

export default function InteractiveBoard({data}) {
    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        setList(data);
    }, [setList, data]);

    const dragItem = useRef();
    const dragItemNode = useRef();

    const handleDragStart = (e, item) => {
        console.log('Starting to drag', item);

        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = item;

        setTimeout(() => {
            setDragging(true);
        }, 0)
    };
    const handleDragEnter = (e, targetItem) => {
        console.log('Entering a drag target', targetItem)
        if (dragItemNode.current !== e.target) {
            console.log('Target is NOT the same as dragged item')
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[targetItem.grpI].items.splice(targetItem.itemI, 0, newList[dragItem.current.grpI].items.splice(dragItem.current.itemI, 1)[0])
                dragItem.current = targetItem;
                localStorage.setItem('List', JSON.stringify(newList));
                return newList
            })
        }
    };
    const handleDragEnd = (e) => {
        setDragging(false);
        dragItem.current = null;
        dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null;
    };
    const isSelected = (item) => {
        if (dragging) {
            if (dragItem.current.grpI === item.grpI && dragItem.current.itemI === item.itemI) {
                return " isSelected"
            }
        }
        return ""
    };

    if (list) {
        return (
            <div className="interactive-board">
                {list.map((grp, grpI) => (
                    //TODO: sepearate this out into own InteractiveColumn component
                    <div key={grp.title} className="interactive-column"
                         onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, {
                             grpI,
                             itemI: 0
                         }) : null}>
                        <InteractiveColumnHeader title={grp.title}/>
                        {grp.items.map((item, itemI) => (
                            //TODO: separate this out into own InteractiveCard component
                            <div draggable
                                 key={item}
                                 className={"interactive-card".concat(isSelected({grpI, itemI}))}
                                 onDragStart={(e) => handleDragStart(e, {grpI, itemI})}
                                 onDragEnter={dragging ? (e) => {
                                     handleDragEnter(e, {grpI, itemI})
                                 } : null}>
                                {item}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    } else {
        return null
    }
}