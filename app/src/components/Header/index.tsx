import { TouchableOpacity } from 'react-native'
import { Text } from '../Text'
import { Container, Content, OrderHeader, Table } from './styles'

type Props = {
  selectedTable: string
  onCancelOrder: () => void
}

export const Header = ({ selectedTable, onCancelOrder }: Props) => (
  <Container>
    {!selectedTable && (
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

    {selectedTable && (
      <Content>
        <OrderHeader>
          <Text weight="600" size={24}>
            Pedido
          </Text>

          <TouchableOpacity onPress={onCancelOrder}>
            <Text color="#d73035" weight="600" size={14}>
              Cancelar Pedido
            </Text>
          </TouchableOpacity>
        </OrderHeader>

        <Table>
          <Text color="#777">Mesa #{selectedTable}</Text>
        </Table>
      </Content>
    )}
  </Container>
)
