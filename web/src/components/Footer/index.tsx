import { Container } from './styles'

export const Footer = () => {
  return (
    <Container>
      <a href="https://github.com/davi1985">
        Davi Silva &copy; {new Date().getFullYear()}
      </a>
    </Container>
  )
}
