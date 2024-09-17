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

import { useMain } from './useMain'

export const Main = () => {
  const {
    selectedTable,
    handleResetOrder,
    isLoading,
    categories,
    handleSelectCategory,
    isLoadingProducts,
    products,
    handleAddToCart,
    handleOpenModal,
    cartItems,
    handleRemoveCartItem,
    isTableModalVisible,
    handleCloseModal,
    handleSaveTable,
  } = useMain()

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
