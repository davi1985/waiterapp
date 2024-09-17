import { FlatList } from 'react-native'
import { Category } from '../../@types'
import { Text } from '../Text'
import { CategoryContainer, Container, Icon } from './styles'
import { useCategories } from './useCategories'

export type CategoriesProps = {
  categories: Category[]
  onSelectCategory: (categoryId: string) => Promise<void>
}
export const Categories = ({
  categories,
  onSelectCategory,
}: CategoriesProps) => {
  const { selectedCategory, handleSelectCategory } = useCategories({
    onSelectCategory,
  })

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
