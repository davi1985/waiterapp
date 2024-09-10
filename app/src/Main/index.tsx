import { useState } from 'react'
import { ActivityIndicator } from 'react-native'

import { Button } from '../components/Button'
import { Categories } from '../components/Categories'
import { Header } from '../components/Header'
import { Menu } from '../components/Menu'
import { TableModal } from '../components/TableModal'
import { Cart } from '../components/Cart'
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
  CenteredContainer,
} from './styles'
import { CartItem, Product } from '../@types'

import { products as mockProducts } from '../mocks/products'
import { Empty } from '../components/Icons/Empty'
import { Text } from '../components/Text'

export const Main = () => {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading] = useState(false)
  const [products] = useState<Product[]>(mockProducts)

  const handleOpenModal = () => setIsTableModalVisible(true)
  const handleCloseModal = () => setIsTableModalVisible(false)

  const handleSaveTable = (table: string) => setSelectedTable(table)

  const handleResetOrder = () => {
    setSelectedTable('')
    setCartItems([])
  }

  const handleAddToCart = (product: Product) => {
    if (!selectedTable) {
      setIsTableModalVisible(true)
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id,
      )

      if (itemIndex < 0) {
        return [...prevState, { quantity: 1, product }]
      }

      const newCartItems = [...prevState]
      const item = newCartItems[itemIndex]

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      }

      return newCartItems
    })
  }

  const handleRemoveCartItem = (product: Product) =>
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id,
      )

      const item = prevState[itemIndex]
      const newCartItems = [...prevState]

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1)

        return newCartItems
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      }

      return newCartItems
    })

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color={'#d73035'} size={'large'} />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>

            {products.length > 0 ? (
              <MenuContainer>
                <Menu onAddToCart={handleAddToCart} products={products} />
              </MenuContainer>
            ) : (
              <CenteredContainer>
                <Empty />

                <Text color="#777" style={{ marginTop: 24 }}>
                  Nenhum produto foi encontrado!
                </Text>
              </CenteredContainer>
            )}
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={handleOpenModal} disabled={isLoading}>
              Novo pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onRemoveItem={handleRemoveCartItem}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveTable}
      />
    </>
  )
}
