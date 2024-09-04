import { FlatList } from 'react-native'
import { Text } from '../Text'
import { Container, Category, Icon } from './styles'
import { categories } from '../../mocks/categories'

export const Categories = () => (
  <Container>
    <FlatList
      horizontal
      data={categories}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={({ _id }) => _id}
      renderItem={({ item: { icon, name } }) => (
        <Category>
          <Icon>
            <Text>{icon}</Text>
          </Icon>

          <Text size={14} weight="600">
            {name}
          </Text>
        </Category>
      )}
    />
  </Container>
)
