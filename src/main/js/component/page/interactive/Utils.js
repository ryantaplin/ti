import {HEIGHT as CARD_HEIGHT} from "./card/CardConstant";

export const orderFromDragState = (isDragging, state) => {
    return isDragging ? state.order : state.dragOrder;
};

export const topStartLocationFromOrderIndex = (value, order) => {
    return order.indexOf(value) * (CARD_HEIGHT + 10);
};