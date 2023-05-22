import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
    id: string,
    img: string,
    title: string,
    price: number
}

export function StoreItem({ id, img, title, price }: StoreItemProps) {

    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()

    const quantity = getItemQuantity(id)

    return (
        <Card>
            <Card.Img height={175} src={img} style={{ objectFit: 'cover' }} />
            <Card.Body className="p-3">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-3">
                    <span className="fw-bold fs-4">{title}</span>
                    <span className="text-muted fs-6">{formatCurrency(price)}</span>
                </Card.Title>
                {quantity > 0 ?
                    <div className="d-flex flex-column align-items-center">
                        <div className="d-flex align-items-center mb-2">
                            <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                            <span className="m-2"><span className="fw-bold">{quantity}</span> in cart</span>
                            <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                        </div>
                        <Button onClick={() => removeFromCart(id)} variant="danger">Remove</Button>
                    </div>
                    :
                    <Button onClick={() => increaseCartQuantity(id)} className="w-100">+ Add To Cart</Button>
                }
            </Card.Body>
        </Card>
    )
}