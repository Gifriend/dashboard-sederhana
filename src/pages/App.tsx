import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Table, Row, Col, Card } from 'react-bootstrap';
import './App.css'; 

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={13} md={10} lg={8}>
            <Card className="main-card">
              <Card.Body>
                <h1 className="text-center mb-4">User Dashboard</h1>
                <Form.Control
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4 search-input"
                />
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <div className="table-responsive">
                    <Table striped bordered hover className="custom-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Company</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.company.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;