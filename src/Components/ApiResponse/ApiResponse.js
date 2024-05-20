import React, { useEffect, useState } from 'react';
import { fetchData } from '@/Utils/api';

const ApiResponse = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(data => setData(data))
      .catch(error => setError(error.message));
  }, []);

  if (error) {
    return <pre>Error: {error}</pre>;
  }

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
};

export default ApiResponse;
