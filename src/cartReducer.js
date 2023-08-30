export default function cartReducer(cart, action) {
    switch (action.type) {
        case "empty":
            return [];
        case "add": {
            const {id, sku} = action;
            const itemInCart = cart.find((i) => i.sku === sku);
            if (itemInCart) {
                // return new array with the matching item replaced
                return cart.map((i) => i.sku === sku ? {...i, quantity: i.quantity + 1} : i);
            } else {
                // return new array with the new item prepended
                return [{id, sku, quantity: 1}, ...cart];
            }
        }
        case "updateQuantity": {
            const {sku, quantity} = action;
            const itemInCart = cart.find((i) => i.sku === sku);
            if (!itemInCart) {
                return;
            }
            if (quantity === 0) {
                return cart.filter((i) => i.sku !== sku);
            }
            return cart.map((i) => i.sku === sku ? {...i, quantity} : i);
        }
        default:
            throw new Error("Unhandled action " + action.type + " in cartReducer.");
    }
}
