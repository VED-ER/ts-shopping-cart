import { Offcanvas, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json"
import { CartItem } from "./CartItem";

export function Cart() {

    const { cartItems, showCart, closeCart } = useShoppingCart()

    return (
        <Offcanvas show={showCart} placement="end" onHide={closeCart}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (<CartItem key={item.id} {...item} />))}
                    <div className="ms-auto fw-bold fs-5">
                        Total: {formatCurrency(cartItems.reduce((total, cartItem) => {
                            const item = storeItems.find(item => item.id === cartItem.id)
                            return total + (item?.price || 0) * cartItem.quantity
                        }, 0))}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}