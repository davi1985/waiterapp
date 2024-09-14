import { ToastContainer } from 'react-toastify'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Orders } from './components/Orders'
import { GlobalStyles } from './styles/GlobalStyles'
import 'react-toastify/ReactToastify.css'

export const App = () => (
  <>
    <GlobalStyles />

    <ToastContainer position="bottom-center" />
    <Header />
    <Orders />
    <Footer />
  </>
)
