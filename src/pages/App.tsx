import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  Table,
  Row,
  Col,
  Card,
  Spinner,
} from 'react-bootstrap';
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
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
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
          <Col xs={12} md={10} lg={10}>
            <Card className="main-card">
              <Card.Body>
                <h1 className="text-center mb-4 dashboard-title">
                  User Dashboard
                </h1>
                <div className="search-container">
                  <Form.Control
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 search-input"
                  />
                  {searchTerm && (
                    <div className="search-results-count">
                      {filteredUsers.length} user
                      {filteredUsers.length !== 1 ? 's' : ''} found
                    </div>
                  )}
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" role="status" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="mt-2">Loading users...</p>
                  </div>
                ) : (
                  <>
                    {filteredUsers.length === 0 ? (
                      <div className="text-center py-5">
                        <p className="text-muted">
                          No users found matching your search
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="d-none d-md-block table-responsive">
                          <Table hover responsive className="custom-table">
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
                                  <td>
                                    <a
                                      href={`mailto:${user.email}`}
                                      className="email-link"
                                    >
                                      {user.email}
                                    </a>
                                  </td>
                                  <td>{user.company.name}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                        <div className="d-md-none">
                          {filteredUsers.map((user) => (
                            <Card key={user.id} className="mb-3 user-card">
                              <Card.Body>
                                <Card.Title className="user-name">
                                  {user.name}
                                </Card.Title>
                                <div className="user-details">
                                  <div className="user-info">
                                    <div className="info-label">Email:</div>
                                    <div className="info-value">
                                      <a
                                        href={`mailto:${user.email}`}
                                        className="email-link"
                                      >
                                        {user.email}
                                      </a>
                                    </div>
                                  </div>
                                  <div className="user-info">
                                    <div className="info-label">Company:</div>
                                    <div className="info-value">
                                      {user.company.name}
                                    </div>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          ))}
                        </div>
                      </>
                    )}
                  </>
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
