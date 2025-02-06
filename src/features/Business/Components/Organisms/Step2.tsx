import { useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TextAtom from '../../../../components/atoms/TextAtom';
import HandymanIcon from '@mui/icons-material/Handyman';
import { ButtonAtom } from '../../../../components/atoms';

const categories = [
  // Oficios tradicionales
  'Albañil',
  'Plomero/Fontanero',
  'Electricista',
  'Carpintero',
  'Herrero',
  'Pintor profesional',
  'Techador',
  'Instalador de pisos',

  // Mantenimiento del hogar
  'Técnico en refrigeración',
  'Reparación de electrodomésticos',
  'Control de plagas',
  'Limpieza residencial',
  'Jardinería y paisajismo',
  'Mudanzas y transporte',
  'Tapicería y muebles',

  // Servicios técnicos
  'Instalación de cámaras de seguridad',
  'Técnico en computadoras',
  'Reparación de celulares',
  'Instalación de redes WiFi',
  'Mantenimiento de piscinas',

  // Servicios especializados
  'Cerrajería de emergencia',
  'Soldadura profesional',
  'Instalación de paneles solares',
  'Servicio de gasfitería',
  'Montacargas y andamios',

  // Servicios para eventos
  'Catering y cocina',
  'Fotografía profesional',
  'DJ y sonido',
  'Decoración de eventos',
  'Seguridad privada',
];

export default function Step2({ onNext, onBack }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { t } = useTranslation();

  const handleSelectCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <Box
      alignItems={{ xs: 'center', md: 'flex-start' }}
      width="100%"
      px={{ xs: 4, md: 10, lg: 24 }}
      textAlign="center"
      p={3}
    >
      <Box
        flex={1}
        width={{ xs: '100%', md: 'auto' }}
        textAlign={{ xs: 'left', md: 'left' }}
        mb={{ xs: 2, md: 0 }}
        display="flex"
        flexDirection="column"
        pt={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        mr={{ md: 5, lg: 5 }}
      >
        <TextAtom variant="title" size="large" fontWeight="bold" sx={{ mb: 1 }}>
          {t('businessStepper.step2.title')}
        </TextAtom>
        <TextAtom
          variant="display"
          size="medium"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          {t('businessStepper.step2.heading')}
        </TextAtom>
        <TextAtom variant="body" size="medium" color="textSecondary" mb={4}>
          {t('businessStepper.step2.description')}
        </TextAtom>
      </Box>

      <Box sx={{ maxHeight: 375, overflowY: 'auto', pr: 1 }}>
        <Grid container spacing={2} justifyContent="left">
          {categories.map((category) => (
            <Grid item key={category} xs={6} sm={4} md={3}>
              <Paper
                onClick={() => handleSelectCategory(category)}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: 0,
                  backgroundColor: selectedCategories.includes(category)
                    ? '#D0BCFF'
                    : '#F3ECFF',
                  cursor: 'pointer',
                  borderRadius: 4,
                  '&:hover': { backgroundColor: '#E6D8FF' },
                  height: '100px',
                }}
              >
                <HandymanIcon sx={{ color: '#2E1A47' }} />
                <TextAtom variant="body" size="medium" color="#2E1A47" mt={1}>
                  {category}
                </TextAtom>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={4} display="flex" justifyContent="space-between">
        <ButtonAtom variant="outlined" onClick={onBack}>
          Atrás
        </ButtonAtom>
        <ButtonAtom
          variant="filled"
          onClick={() => {
            console.log('Selected Categories:', selectedCategories);
            onNext(selectedCategories);
          }}
          disabled={selectedCategories.length === 0}
        >
          Siguiente
        </ButtonAtom>
      </Box>
    </Box>
  );
}
