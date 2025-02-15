import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Card } from 'react-bootstrap';
import { 
  LoadingSpinner,
  NoUsersFound,
  UserTableView,
  UserCardView
} from '../../component';
import { fetchUsers } from '../../service';
import { User } from '../../types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }
    
    if (filteredUsers.length === 0) {
      return <NoUsersFound />;
    }
    
    return (
      <>
        <UserTableView users={filteredUsers} />
        <UserCardView users={filteredUsers} />
      </>
    );
  };

  return (
    <div className="app-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={10}>
            <Card className="main-card">
              <Card.Body>
                <h1 className="text-center mb-4 dashboard-title">User Dashboard</h1>
                
                <div className="search-container">
                  <Form.Control
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="mb-4 search-input"
                  />
                  {searchTerm && (
                    <div className="search-results-count">
                      {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
                    </div>
                  )}
                </div>
                
                {renderContent()}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;