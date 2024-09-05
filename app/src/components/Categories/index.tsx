import { FlatList } from 'react-native'
import { Text } from '../Text'
import { Container, Category, Icon } from './styles'
import { categories } from '../../mocks/categories'
import { useState } from 'react'

export const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleSelectCategory = (categoryId: string) => {
    const category = selectedCategory === categoryId ? '' : categoryId

    setSelectedCategory(category)
  }

  return (
    <Container>
      <FlatList
        horizontal
        data={categories}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 24 }}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item: { _id, icon, name } }) => {
          const isSelected = selectedCategory === _id

          return (
            <Category onPress={() => handleSelectCategory(_id)}>
              <Icon>
                <Text opacity={isSelected ? 1 : 0.5}>{icon}</Text>
              </Icon>

              <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
                {name}
              </Text>
            </Category>
          )
        }}
      />
    </Container>
  )
}
