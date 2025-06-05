import React from 'react';
import { Box, Container } from '@mui/material';

const TermsAndConditions: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ height: "100vh", py: 2 }}>
      <iframe 
        src="/terms-and-conditions/index.html" 
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="Terms and Conditions"
      />
    </Container>
  );
};

export default TermsAndConditions;