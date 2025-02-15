import React from 'react';
import { Card } from 'react-bootstrap';
import { User } from '../../types';

interface UserCardViewProps {
  users: User[];
}

const UserCardView: React.FC<UserCardViewProps> = ({ users }) => (
  <div className="d-md-none">
    {users.map((user) => (
      <Card key={user.id} className="mb-3 user-card">
        <Card.Body>
          <Card.Title className="user-name">{user.name}</Card.Title>
          <div className="user-details">
            <div className="user-info">
              <div className="info-label">Email:</div>
              <div className="info-value">
                <a href={`mailto:${user.email}`} className="email-link">
                  {user.email}
                </a>
              </div>
            </div>
            <div className="user-info">
              <div className="info-label">Company:</div>
              <div className="info-value">{user.company.name}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    ))}
  </div>
);

export default UserCardView;