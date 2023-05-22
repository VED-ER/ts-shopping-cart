import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Navbar } from "./components/Navbar"
import { Container } from "react-bootstrap"
import { ShoppingCartContextProvider } from "./context/ShoppingCartContext"

function App() {
  return (
    <ShoppingCartContextProvider>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </ShoppingCartContextProvider>
  )
}

export default App
