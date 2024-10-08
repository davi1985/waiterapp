import { FlatList, TouchableOpacity } from 'react-native'
import { CartItem, Product } from '../../@types'
import { formatCurrency } from '../../utils/formatCurrency'
import { Button } from '../Button'
import { MinusCircle } from '../Icons/MinusCircle'
import { PlusCircle } from '../Icons/PlusCircle'
import { OrderConfirmedModal } from '../OrderConfirmedModal'
import { Text } from '../Text'
import {
  Actions,
  Item,
  Price,
  ProductContainer,
  ProductDetails,
  ProductImage,
  QuantityContainer,
  Summary,
} from './styles'
import { useCart } from './useCart'

export type CartProps = {
  cartItems: CartItem[]
  onAdd: (product: Product) => void
  onRemoveItem: (product: Product) => void
  onConfirmOrder: () => void
  selectedTable: string
}

export const Cart = ({
  cartItems,
  onAdd,
  onRemoveItem,
  onConfirmOrder,
  selectedTable,
}: CartProps) => {
  const {
    orderConfirmedModalVisible,
    handleOk,
    cartIsEmpty,
    total,
    handleConfirmOrder,
    isLoading,
  } = useCart({
    cartItems,
    onConfirmOrder,
    selectedTable,
  })

  return (
    <>
      <OrderConfirmedModal
        visible={orderConfirmedModalVisible}
        onOk={handleOk}
      />

      {cartIsEmpty && (
        <FlatList
          data={cartItems}
          keyExtractor={({ product }) => product._id}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <ProductImage
                  source={{
                    uri: `http://192.168.0.100:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#777">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>

                  <Text size={14} color="#777">
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onRemoveItem(cartItem.product)}
                >
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Summary>
        <Price>
          {cartIsEmpty ? (
            <>
              <Text color={'#777'}>Total</Text>

              <Text weight="600" size={20}>
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text style={{ textAlign: 'center' }}>
              Seu carrinho está vazio!
            </Text>
          )}
        </Price>

        <Button
          onPress={handleConfirmOrder}
          disabled={!cartIsEmpty}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  )
}
