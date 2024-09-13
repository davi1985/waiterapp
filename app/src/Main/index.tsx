import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'

import { Button } from '../components/Button'
import { Cart } from '../components/Cart'
import { Categories } from '../components/Categories'
import { Header } from '../components/Header'
import { Empty } from '../components/Icons/Empty'
import { Menu } from '../components/Menu'
import { TableModal } from '../components/TableModal'
import { Text } from '../components/Text'

import {
  CategoriesContainer,
  CenteredContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
} from './styles'

import { CartItem, Category, Product } from '../@types'
import { httpRequest } from '../utils/httpRequest'

export const Main = () => {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  useEffect(() => {
    Promise.all([
      httpRequest.get('/categories'),
      httpRequest.get('http://192.168.0.100:3001/products'),
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data)
      setProducts(productsResponse.data)
      setIsLoading(false)
    })
  }, [])

  const handleSelectCategory = async (categoryId: string) => {
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`

    setIsLoadingProducts(true)

    const { data } = await httpRequest.get(route)

    setProducts(data)
    setIsLoadingProducts(false)
  }

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
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color={'#d73035'} size={'large'} />
              </CenteredContainer>
            ) : (
              <>
                {products.length ? (
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
              selectedTable={selectedTable}
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
