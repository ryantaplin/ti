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
        //console.log('Starting to drag', item);

        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = item;

        setTimeout(() => {
            setDragging(true);
        }, 0)
    };
    const handleDragEnter = (e, targetItem) => {
        //console.log('Entering a drag target', targetItem);
        if (dragItemNode.current !== e.target) {
            //console.log('Target is NOT the same as dragged item');
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[targetItem.grpI].items.splice(targetItem.itemI, 0, newList[dragItem.current.grpI].items.splice(dragItem.current.itemI, 1)[0])
                dragItem.current = targetItem;
                localStorage.setItem('List', JSON.stringify(newList));
                return newList
            })
        }
    };
    const isChild = (targetKey, dragChildren) => {
        const stringKey = JSON.stringify(targetKey);
        for (let index = 0; index < dragChildren.length; index++) {
            if (dragChildren[index].id === stringKey) {
                return true;
            }
        }
    };
    const handleDragEnterSegement = (e, targetItem, position) => {
        if (dragItemNode.current !== e.target && !isChild(targetItem, dragItemNode.current.children)) {
            console.log("Entering target", targetItem, position);
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

    //Card 1 - TOP / MID / BOT
    //Card 2 - TOP / MID / BOT
    //Card 3 - TOP/ MID / BOT

    //TOP_REF
    //MID_REF
    //BOT_REF

    // GIVEN WE HAVE 1 COLUMN WITH 3 ITEMS WHICH ARE POSITIONED IN SEQUENTIAL ORDER, WHEN WE MOVE ITEM 1 TO BE BELOW ITEM 3....

    //ITEM1 Enter ITEM2 TOP -> TOP_REF = ITEM2 (MOVE ITEM11 ABOVE ITEM2 - NO RERENDER)
    //ITEM1 Enter ITEM2 MID -> MID_REF = ITEM2 (MERGE ITEM1 AND ITEM2 RERENDER)
    //ITEM1 Enter ITEM2 BOT -> BOT_REF = ITEM2 (MERGE ITEM1 AND ITEM2 RERENDER)
    //ITEM1 Enter ITEM3 TOP -> TOP_REF = ITEM3 (MOVE ITEM1 BELOW ITEM2 RERENDER)
    //ITEM1 Enter ITEM3 MID -> MID_REF = ITEM3 (MERGE ITEM1 AND ITEM3 RERENDER)
    //ITEM1 Enter ITEM3 BOT -> BOT_REF = ITEM3 (MERGE ITEM1 AND ITEM3 RERENDER)
    //ITEM1 Exit ITEM3 TOP -> TOP_REF = null (MOVE ITEM1 BELOW ITEM3 RERENDER)

    //----- Logic -----
    // 1) We must have some state to remember TOP, MID and BOT REF.
    // 2) When a card enters a card section (i.e TOP, MID or BOT) we update the respective REF accordingly.
    // 3) When a card leaves a card section (i.e TOP, MID or BOT) make respective REF null if the REF is still referring to that item.
    // 4) When a card is in (TOP_REF and MID_REF) or (MID_REF and BOT_REF) or (TOP_REF, MID_REF and BOT_REF) we should calculate the combined total and rerender.
    // 5) When TOP_REF and BOT_REF are different, we should rerender the card to be inbetween the two REF
    // 6) When TOP_REF is not null but BOT_REF is null, we should rerender the card above TOP_REF.
    // 7) When BOT_REF is not null but TOP_REF is null, we should rerender the card below BOT_REF.

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
                            <div draggable key={item} className={"interactive-card".concat(isSelected({grpI, itemI}))}
                                 onDragStart={(e) => handleDragStart(e, {grpI, itemI})} >

                                <div id={JSON.stringify({grpI, itemI})} className="blah" style={{zIndex: "999", position: "absolute"}}>{item}</div>
                                <div id={JSON.stringify({grpI, itemI})} className="interactive-card-hover-segments" style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                    width: "100%",
                                    zIndex: "",
                                }}>
                                    <div id={JSON.stringify({grpI, itemI})} style={{width: "100%", height: "33%", backgroundColor: "red"}}
                                         onDragEnter={(e) => handleDragEnterSegement(e, {grpI, itemI}, "TOP")}/>
                                    <div id={JSON.stringify({grpI, itemI})} style={{width: "100%", height: "33%", backgroundColor: "blue"}}
                                         onDragEnter={(e) => handleDragEnterSegement(e, {grpI, itemI}, "MID")}/>
                                    <div id={JSON.stringify({grpI, itemI})} style={{width: "100%", height: "33%", backgroundColor: "red"}}
                                         onDragEnter={(e) => handleDragEnterSegement(e, {grpI, itemI}, "BOT")}/>
                                    {/*, backgroundColor: "red"*/}
                                </div>
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