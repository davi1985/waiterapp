import styled from 'styled-components'

export const Container = styled.header`
  background: #d73035;
  display: flex;
  justify-content: center;
  height: 198px;
  align-items: center;
`

export const Content = styled.div`
  max-width: 1216px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    h1 {
      font-size: 2rem;
      color: white;
    }

    h2 {
      font-size: 1rem;
      font-weight: 400;
      color: white;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
`
