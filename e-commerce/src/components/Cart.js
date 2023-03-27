import { useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import UserContext from '../UserContext';

export default function Cart() {
  const { cart } = useContext(UserContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>PhP {item.price}</td>
              <td>{item.quantity}</td>
              <td>PhP {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-right">
              Total:
            </td>
            <td>PhP {total}</td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}