import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
    id: string,
    quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart()

    const item = storeItems.find(item => item.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="">
            <img src={item.imgUrl} style={{ width: '125px', height: '75px', objectFit: 'cover' }} />
            <div className="me-auto">
                <div>
                    {item.name}{quantity > 1 && <span className="text-muted" style={{ fontSize: '10px' }}>{quantity}x</span>}
                </div>
                <div className="text-muted" style={{ fontSize: '10px' }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>
                {formatCurrency(item.price * quantity)}
            </div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(id)}>X</Button>
        </Stack>
    )

}