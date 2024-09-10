import { ReactNode } from 'react'
import { Text } from '../Text'
import { Container } from './styles'
import { ActivityIndicator } from 'react-native'

type Props = {
  children: ReactNode
  onPress: () => void
  disabled?: boolean
  loading?: boolean
}

export const Button = ({ children, onPress, disabled, loading }: Props) => (
  <Container onPress={onPress} disabled={disabled || loading}>
    {!loading ? (
      <Text weight="600" color="#fff">
        {children}
      </Text>
    ) : (
      <ActivityIndicator color={'#fff'} />
    )}
  </Container>
)
