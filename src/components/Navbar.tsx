import { Navbar as NavbarBS, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar() {

    const { openCart, cartQuantity } = useShoppingCart()

    return (
        <NavbarBS className="shadow mb-4">
            <Container>
                <Nav>
                    <Nav.Link to='/' as={NavLink}> Home</Nav.Link>
                    <Nav.Link to='/store' as={NavLink}>Store</Nav.Link>
                    <Nav.Link to='/about' as={NavLink}>About</Nav.Link>
                </Nav>
                <div style={{ position: 'relative' }}>
                    <Button onClick={openCart}>Cart</Button>
                    {cartQuantity > 0 && <div style={{
                        position: 'absolute',
                        backgroundColor: 'red',
                        width: '20px',
                        borderRadius: '50%',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        right: -10,
                        bottom: -10
                    }}
                    >
                        <span style={{ fontSize: 14, color: 'white' }}>{cartQuantity}</span>
                    </div>}
                </div>
            </Container>
        </NavbarBS>
    )
}