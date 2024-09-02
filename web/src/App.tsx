import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Orders } from './components/Orders'
import { GlobalStyles } from './styles/GlobalStyles'

export const App = () => (
  <>
    <GlobalStyles />
    <Header />
    <Orders />
    <Footer />
  </>
)
