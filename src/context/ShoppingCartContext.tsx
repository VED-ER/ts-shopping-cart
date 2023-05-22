import { createContext, ReactNode, useContext, useState } from "react";
import { Cart } from "../components/Cart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartContextProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: string,
    quantity: number
}

type ShoppingCartContextProps = {
    cartItems: CartItem[],
    getItemQuantity: (id: string) => number,
    increaseCartQuantity: (id: string) => void,
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void,
    openCart: () => void,
    closeCart: () => void,
    showCart: boolean,
    cartQuantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export function ShoppingCartContextProvider({ children }: ShoppingCartContextProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>([], 'CART_ITEMS')
    const [showCart, setShowCart] = useState(false)

    const cartQuantity = cartItems.reduce((prev, curr) => curr.quantity + prev, 0)

    const openCart = () => setShowCart(true)

    const closeCart = () => setShowCart(false)

    const getItemQuantity = (id: string) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseCartQuantity = (id: string) => {
        setCartItems(prevItems => {
            const isInCart = prevItems.find(item => item.id === id)
            if (isInCart) {
                return prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity++ }
                    } else {
                        return item
                    }
                })
            } else {
                return [...prevItems, { id, quantity: 1 }]
            }
        })
    }

    const decreaseCartQuantity = (id: string) => {
        setCartItems(prevItems => {
            const itemInCart = prevItems.find(item => item.id === id)
            if (itemInCart?.quantity === 1) {
                return prevItems.filter(item => item.id !== id)
            } else {
                return prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    }

    const context: ShoppingCartContextProps = {
        cartItems,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        showCart,
        cartQuantity
    }

    return (
        <ShoppingCartContext.Provider value={context}>
            {children}
            <Cart />
        </ShoppingCartContext.Provider>
    )
}

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}