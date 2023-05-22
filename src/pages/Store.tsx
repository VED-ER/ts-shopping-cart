import { Col, Row } from 'react-bootstrap'
import items from '../data/items.json'
import { StoreItem } from '../components/StoreItem'

export function Store() {
    return (
        <>
            <h1>Store</h1>
            <Row xs={1} md={2} lg={3} className='g-3'>
                {items.map(item => (<Col><StoreItem id={item.id} img={item.imgUrl} price={item.price} title={item.name} /></Col>))}
            </Row>
        </>
    )
}