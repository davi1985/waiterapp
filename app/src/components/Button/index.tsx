import { ReactNode } from 'react'
import { Text } from '../Text'
import { Container } from './styles'

type Props = {
  children: ReactNode
  onPress: () => void
  disabled?: boolean
}

export const Button = ({ children, onPress, disabled }: Props) => (
  <Container onPress={onPress} disabled={disabled}>
    <Text weight="600" color="#fff">
      {children}
    </Text>
  </Container>
)
