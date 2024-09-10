import { Modal } from 'react-native'
import { Text } from '../Text'
import { Container, OkButton } from './styles'
import { CheckCircle } from '../Icons/CheckCircle'

type Props = {
  visible: boolean
  onOk: () => void
}

export const OrderConfirmedModal = ({ visible, onOk }: Props) => (
  <Modal visible={visible} animationType="fade">
    <Container>
      <CheckCircle />
      <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
        Pedido confirmado
      </Text>

      <Text opacity={0.9} color="#fff" style={{ marginTop: 4 }}>
        Pedido confirmado
      </Text>

      <OkButton onPress={onOk}>
        <Text color="#d73035" weight="600">
          OK
        </Text>
      </OkButton>
    </Container>
  </Modal>
)
