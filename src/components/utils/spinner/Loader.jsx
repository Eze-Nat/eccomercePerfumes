import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ src, alt, placeholder }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <>
      {loading && (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <Spinner animation="border" role="status" />
        </div>
      )}

      <img
        src={error ? placeholder : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: loading ? 'none' : 'block', maxWidth: '100%', height: 'auto' }}
      />
    </>
  );
};

export default Loader;
