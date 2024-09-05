import { Text } from '../Text'
import { Container } from './styles'

type Props = {
  table?: string
}

export const Header = ({ table }: Props) => (
  <Container>
    {table ? (
      <Text size={14} opacity={0.9}>
        Pedido da mesa #{table}
      </Text>
    ) : (
      <>
        <Text size={14} opacity={0.9}>
          Bem vindo(a) ao
        </Text>

        <Text size={24} weight="700">
          WAITER
          <Text size={24}>APP</Text>
        </Text>
      </>
    )}
  </Container>
)
