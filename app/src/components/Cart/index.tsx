import { FlatList, TouchableOpacity } from 'react-native'
import { CartItem } from '../../@types'
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
import { Button } from '../Button'
import { PlusCircle } from '../Icons/PlusCircle'
import { MinusCircle } from '../Icons/MinusCircle'
import { formatCurrency } from '../../utils/formatCurrency'

type Props = {
  cartItems: CartItem[]
}

export const Cart = ({ cartItems }: Props) => {
  const cartIsEmpty = Boolean(cartItems.length)

  return (
    <>
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
                <TouchableOpacity onPress={() => alert('+')}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => alert('-')}>
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
                {formatCurrency(120)}
              </Text>
            </>
          ) : (
            <Text style={{ textAlign: 'center' }}>
              Seu carrinho está vazio!
            </Text>
          )}
        </Price>

        <Button onPress={() => alert('confirm')} disabled={cartIsEmpty}>
          Confirmar pedido
        </Button>
      </Summary>
    </>
  )
}
