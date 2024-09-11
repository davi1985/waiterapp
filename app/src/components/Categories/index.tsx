import { FlatList } from 'react-native'
import { Text } from '../Text'
import { Container, CategoryContainer, Icon } from './styles'
import { useState } from 'react'
import { Category } from '../../@types'

type Props = {
  categories: Category[]
  onSelectCategory: (categoryId: string) => Promise<void>
}
export const Categories = ({ categories, onSelectCategory }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleSelectCategory = (categoryId: string) => {
    const category = selectedCategory === categoryId ? '' : categoryId

    setSelectedCategory(category)
    onSelectCategory(category)
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
            <CategoryContainer onPress={() => handleSelectCategory(_id)}>
              <Icon>
                <Text opacity={isSelected ? 1 : 0.5}>{icon}</Text>
              </Icon>

              <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
                {name}
              </Text>
            </CategoryContainer>
          )
        }}
      />
    </Container>
  )
}
