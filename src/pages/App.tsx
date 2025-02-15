import { useState } from 'react';
import { Container, Form, InputGroup, Table } from 'react-bootstrap';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Container className="mt-5">
      <h1 className="text-center">User Dashboard</h1>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm}
        />
      </InputGroup>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );
}

export default App;
