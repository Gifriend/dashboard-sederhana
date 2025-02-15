import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner: React.FC = () => (
  <div className="text-center py-5">
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    <p className="mt-2">Loading users...</p>
  </div>
);

export default LoadingSpinner;