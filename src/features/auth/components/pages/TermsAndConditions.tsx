import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import AuthLayout from '../templates/AuthLayout';

const TermsAndConditions: React.FC = () => {
  return (
    <AuthLayout>
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Términos y Condiciones de Uso
      </Typography>

      <Typography variant="body1" paragraph>
        Al acceder y utilizar la aplicación Reco, aceptas cumplir con estos
        Términos y Condiciones. Si no estás de acuerdo con alguno de estos
        términos, por favor no utilices la aplicación.
      </Typography>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          1. Uso de la Aplicación
        </Typography>
        <Typography variant="body1" paragraph>
          Reco proporciona una plataforma para facilitar [insertar descripción
          general del propósito de la app]. El uso indebido, como actividades
          ilegales o no autorizadas, está estrictamente prohibido.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          2. Propiedad Intelectual
        </Typography>
        <Typography variant="body1" paragraph>
          Todos los contenidos, funcionalidades y elementos visuales de Reco son
          propiedad de sus respectivos dueños y están protegidos por leyes de
          derechos de autor. No puedes copiar, modificar ni distribuir ninguno
          de estos elementos sin autorización.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          3. Limitación de Responsabilidad
        </Typography>
        <Typography variant="body1" paragraph>
          Reco no se hace responsable de posibles errores, interrupciones o
          daños que puedan derivarse del uso de la aplicación. El uso de la app
          es bajo tu propio riesgo.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          4. Modificaciones
        </Typography>
        <Typography variant="body1" paragraph>
          Nos reservamos el derecho de modificar estos Términos y Condiciones en
          cualquier momento. Te notificaremos sobre cambios importantes a través
          de la aplicación o por correo electrónico.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          5. Contacto
        </Typography>
        <Typography variant="body1" paragraph>
          Si tienes preguntas sobre estos Términos y Condiciones, puedes
          contactarnos a través de: contacto@recoapp.com
        </Typography>
      </Box>
    </Container>
    </AuthLayout>
  );
};

export default TermsAndConditions;
