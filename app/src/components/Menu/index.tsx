import { useState } from 'react'
import { FlatList } from 'react-native'

import { Product } from '../../@types'
import { Text } from '../Text'
import {
  AddToCartButton,
  ProductContainer,
  ProductDetails,
  ProductImage,
  Separator,
} from './styles'

import { formatCurrency } from '../../utils/formatCurrency'
import { PlusCircle } from '../Icons/PlusCircle'
import { ProductModal } from '../ProductModal'

type Props = {
  onAddToCart: (product: Product) => void
  products: Product[]
}

export const Menu = ({ onAddToCart, products }: Props) => {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleProductModalOpen = (product: Product) => {
    setIsProductModalVisible(true)
    setSelectedProduct(product)
  }

  const handleProductModalClose = () => setIsProductModalVisible(false)

  return (
    <>
      <ProductModal
        visible={isProductModalVisible}
        onClose={handleProductModalClose}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />

      <FlatList
        data={products}
        keyExtractor={({ _id }) => _id}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleProductModalOpen(product)}>
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

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
        ItemSeparatorComponent={Separator}
      />
    </>
  )
}
