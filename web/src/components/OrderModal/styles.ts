import styled from 'styled-components'

export const Overlay = styled.div`
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2.5px);
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Body = styled.div`
  background: #fff;
  width: 480px;
  padding: 2rem;
  border-radius: 0.5rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 1.5rem;
    }

    button {
      border: none;
      background: transparent;
      line-height: 0;
    }
  }

  .status-container {
    margin-top: 2rem;

    small {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
  }
`

export const OrderDetails = styled.div`
  margin-top: 2rem;

  > strong {
    font-weight: 500;
    font-size: 0.875rem;
    opacity: 0.8;
  }

  .order-items {
    margin-top: 1rem;

    .item {
      display: flex;

      & + .item {
        margin-top: 1rem;
      }

      img {
        border-radius: 6px;
      }

      .quantity {
        font-size: 0.875rem;
        color: #777;
        display: block;
        min-width: 20px;
        margin-left: 0.75rem;
      }

      .product-details {
        margin-left: 4px;

        strong {
          display: block;
          margin-bottom: 4px;
        }

        span {
          font-size: 0.875rem;
          color: #777;
        }
      }
    }
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;

    span {
      font-weight: 500;
      font-size: 0.875rem;
      opacity: 0.8;
    }
  }
`

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  .primary {
    background: #333;
    border-radius: 3rem;
    border: none;
    color: white;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .secondary {
    padding: 0.75rem 1.5rem;
    color: #d73035;
    font-weight: bold;
    border: none;
    background: transparent;
    margin-top: 0.75rem;
  }
`
