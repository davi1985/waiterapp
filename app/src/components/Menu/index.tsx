import { FlatList } from 'react-native'
import { Text } from '../Text'
import {
  Container,
  Product,
  ProductDetails,
  ProductImage,
  Separator,
  AddToCartButton,
} from './styles'
import { products } from '../../mocks/products'
import { formatCurrency } from '../../utils/formatCurrency'
import { PlusCircle } from '../Icons/PlusCircle'

export const Menu = () => (
  <Container>
    <FlatList
      data={products}
      keyExtractor={({ _id }) => _id}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      renderItem={({ item: product }) => (
        <Product>
          <ProductImage
            source={{
              uri: `http://192.168.0.100:3001/uploads/${product.imagePath}`,
            }}
          />

          <ProductDetails>
            <Text weight="600">{product.name}</Text>

            <Text color="#777" size={14} style={{ marginVertical: 8 }}>
              {product.description}
            </Text>

            <Text size={14} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </ProductDetails>

          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Product>
      )}
      ItemSeparatorComponent={Separator}
    />
  </Container>
)
