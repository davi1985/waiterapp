import { FlatList, Modal } from 'react-native'
import { Text } from '../Text'
import { Product } from '../../@types'
import {
  CloseButton,
  Image,
  Header,
  Body,
  IngredientsContainer,
  Ingredient,
  Footer,
  FooterContainer,
  Price,
} from './styles'
import { Close } from '../Icons/Close'
import { formatCurrency } from '../../utils/formatCurrency'
import { Button } from '../Button'

type Props = {
  visible: boolean
  onClose: () => void
  product: Product | null
  onAddToCart: (product: Product) => void
}

export const ProductModal = ({
  visible,
  onClose,
  product,
  onAddToCart,
}: Props) => {
  const handleAddToCart = () => {
    onAddToCart(product!)
    onClose()
  }

  if (!product) {
    return null
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.0.100:3001/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <Body>
        <Header>
          <Text weight="600" size={24}>
            {product.name}
          </Text>

          <Text color="#777">{product.description}</Text>
        </Header>

        {Boolean(product.ingredients.length) && (
          <IngredientsContainer>
            <Text color="#777" weight="600">
              Ingredientes
            </Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={({ _id }) => _id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color={'#777'} style={{ marginLeft: 20 }}>
                    {ingredient.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </Body>
      <Footer>
        <FooterContainer>
          <Price>
            <Text color="#777">Preço</Text>
            <Text size={20} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </Price>

          <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  )
}
