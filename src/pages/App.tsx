import { useState } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';

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
    </Container>
  );
}

export default App;
