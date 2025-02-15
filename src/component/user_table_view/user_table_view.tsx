import React from 'react';
import { Table } from 'react-bootstrap';
import { User } from '../../types';

interface UserTableViewProps {
  users: User[];
}

const UserTableView: React.FC<UserTableViewProps> = ({ users }) => (
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
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>
              <a href={`mailto:${user.email}`} className="email-link">
                {user.email}
              </a>
            </td>
            <td>{user.company.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default UserTableView;