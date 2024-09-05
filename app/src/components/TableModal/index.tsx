import { Modal, TouchableOpacity, Platform } from 'react-native'
import { Text } from '../Text'
import { Body, Form, Overlay, Header, Input } from './styles'
import { Close } from '../Icons/Close'
import { Button } from '../Button'
import { useState } from 'react'

type Props = {
  visible: boolean
  onClose: () => void
  onSave: (table: string) => void
}

export const TableModal = ({ visible, onClose, onSave }: Props) => {
  const [table, setTable] = useState('')

  const handleSave = () => {
    onSave(table)
    onClose()
  }

  const behavior = Platform.OS === 'android' ? 'height' : 'padding'

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay behavior={behavior}>
        <Body>
          <Header>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#777" />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder="Número da mesa"
              placeholderTextColor={'#777'}
              keyboardType="number-pad"
              onChangeText={setTable}
            />

            <Button onPress={handleSave} disabled={!table.length}>
              Salvar
            </Button>
          </Form>
        </Body>
      </Overlay>
    </Modal>
  )
}
