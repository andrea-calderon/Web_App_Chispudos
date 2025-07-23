import React from 'react';
import { Box, Divider, Fade, List, ListItem } from '@mui/material';
import { TextAtom, ButtonAtom } from '../../../../components/atoms';
import { useNavigate } from 'react-router-dom';
import AppLogo from '../../../../components/molecules/AppLogo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const privacyPolicy = {
  title: 'Política de Privacidad',
  subTitle: 'Última actualización: 25 de julio 2025',
  sections: [
    {
      title: '1. Responsable del Tratamiento',
      paragraphs: [
        'Nombre Legal: Reco - Profesionales de Confianza',
        'Dirección Fiscal: Residenciales San Jose, San José Pinula, Guatemala.',
        'Email: privacy@recolatam.com',
      ],
    },
    {
      title: '2. Datos que Recopilamos',
      paragraphs: ['a) Datos proporcionados por usted:'],
      bullets: [
        'Registro: Nombre completo, email, teléfono, foto de perfil.',
        'Profesionales: Experiencia, habilidades, licencias (opcional), precios.',
        'Contenido: Fotos de proyectos, reseñas, mensajes.',
      ],
      paragraphs2: ['b) Datos recopilados automáticamente:'],
      bullets2: [
        'Ubicación GPS: Solo cuando la app está en uso (puede desactivarse)',
        'Dispositivo: Modelo, SO, dirección IP.',
        'Uso: Tiempo en pantalla, búsquedas, clics.',
      ],
      paragraphs3: ['c) Datos de terceros:'],
      bullets3: ['Si inicia sesión con Facebook/Google: Nombre y email.'],
    },
    {
      title: '3. Finalidades del Tratamiento',
      paragraphs: ['Usamos sus datos para:'],
      bullets: [
        'Conectar usuarios con profesionales',
        'Personalizar recomendaciones (usando ubicación)',
        'Verificar identidades (foto de perfil)',
        'Mejorar nuestra plataforma (análisis de uso)',
        'Enviar ofertas relevantes (puede optar por no recibirlas)',
      ],
    },
    {
      title: '4. Bases Legales (Ley 57-2008)',
      bullets: [
        'Contrato ejecución: Para prestar el servicio',
        'Consentimiento explícito: Para ubicación y marketing',
        'Interés legítimo: Análisis de datos anonimizados',
      ],
    },
    {
      title: '5. Compartir Datos',
      paragraphs: ['Sus datos podrán ser compartidos con:'],
      bullets: [
        'Profesionales: Solo al contratar un servicio (verán su nombre y ubicación aproximada)',
        'Proveedores técnicos: Hosting en AWS/Google Cloud (con contratos GDPR)',
        'Autoridades: Por requerimiento legal en Guatemala',
      ],
    },
    {
      title: '6. Seguridad de Datos',
      paragraphs: ['Implementamos:'],
      bullets: [
        'Encriptación SSL/TLS en comunicaciones',
        'Accesos restringidos con autenticación de dos factores',
        'Copias de seguridad diarias',
      ],
    },
    {
      title: '7. Derechos ARCO',
      paragraphs: [
        'Para ejercerlos: Enviar solicitud a privacy@reco.com (respondemos en 10 días hábiles). Usted puede:',
      ],
      bullets: [
        'Acceder a sus datos almacenados',
        'Rectificar información incorrecta',
        'Cancelar su cuenta y eliminar datos',
        'Oponerse a tratamientos con fines comerciales',
      ],
    },
    {
      title: '8. Retención de Datos',
      bullets: [
        'Cuentas activas: Hasta que solicite eliminación',
        'Cuentas inactivas: 2 años (luego anonimizamos)',
        'Datos de transacciones: 5 años (por obligaciones fiscales)',
      ],
    },
    {
      title: '9. Menores de Edad',
      paragraphs: [
        '⚠️ Prohibido el registro a menores de 18 años. Si detectamos una cuenta de menor, será eliminada inmediatamente.',
      ],
    },
    {
      title: '10. Cambios en esta Política',
      paragraphs: ['Notificaremos cambios vía:'],
      bullets: [
        'Email a usuarios registrados',
        'Banner destacado en la app durante 7 días',
      ],
    },
    {
      title: '11. Contacto',
      paragraphs: ['Para dudas sobre privacidad:'],
      bullets: [
        'privacy@recolatam.com',
        'Oficina: Residenciales San Jose, San José Pinula, Guatemala.',
      ],
    },
  ],
};

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Fade in timeout={600}>
      <Box
        sx={{
          maxWidth: 800,
          mx: 'auto',
          px: { xs: 6, md: 4 },
          py: { xs: 3, md: 6 },
          backgroundColor: '#fff',
        }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <AppLogo sx={{ width: 100, height: 'auto', mb: 2 }} />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 2 }}>
          <TextAtom
            variant="headline"
            size="large"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              textAlign: 'center',
            }}
          >
            {privacyPolicy.title}
          </TextAtom>
          <br />
          <TextAtom
            variant="body"
            size="large"
            sx={{
              mb: 2,
              textAlign: 'center',
            }}
          >
            {privacyPolicy.subTitle}
          </TextAtom>
        </Box>
        {privacyPolicy.sections.map((section, idx) => (
          <Box key={idx} sx={{ mb: 3 }}>
            <TextAtom
              variant="title"
              fontWeight="bold"
              sx={{
                fontSize: '1.2rem',
                mb: 1,
                color: '#333',
              }}
            >
              {section.title}
            </TextAtom>
            {section.paragraphs &&
              section.paragraphs.map((p, i) => (
                <TextAtom key={i} variant="body" size="medium" sx={{ mb: 1 }}>
                  {p}
                </TextAtom>
              ))}
            {section.bullets && (
              <List sx={{ pl: 3, mb: 0 }}>
                {section.bullets.map((b, i) => (
                  <ListItem
                    key={i}
                    sx={{
                      display: 'list-item',
                      py: 0,
                      mb: 0,
                      listStyleType: 'disc',
                      color: 'inherit',
                    }}
                  >
                    <TextAtom variant="body" size="medium">
                      {b}
                    </TextAtom>
                  </ListItem>
                ))}
              </List>
            )}
            {/* Para secciones con más grupos de bullets/parrafos */}
            {section.paragraphs2 &&
              section.paragraphs2.map((p, i) => (
                <TextAtom
                  key={`p2-${i}`}
                  variant="body"
                  size="medium"
                  sx={{ mb: 1 }}
                >
                  {p}
                </TextAtom>
              ))}
            {section.bullets2 && (
              <List sx={{ pl: 3, mb: 0 }}>
                {section.bullets2.map((b, i) => (
                  <ListItem
                    key={`b2-${i}`}
                    sx={{ display: 'list-item', py: 0, mb: 0 }}
                  >
                    <TextAtom variant="body" size="medium">
                      {b}
                    </TextAtom>
                  </ListItem>
                ))}
              </List>
            )}
            {section.paragraphs3 &&
              section.paragraphs3.map((p, i) => (
                <TextAtom
                  key={`p3-${i}`}
                  variant="body"
                  size="medium"
                  sx={{ mb: 1 }}
                >
                  {p}
                </TextAtom>
              ))}
            {section.bullets3 && (
              <List sx={{ pl: 3, mb: 0 }}>
                {section.bullets3.map((b, i) => (
                  <ListItem
                    key={`b3-${i}`}
                    sx={{ display: 'list-item', py: 0, mb: 0 }}
                  >
                    <TextAtom variant="body" size="medium">
                      {b}
                    </TextAtom>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#fff',
            zIndex: 10,
            pt: 2,
            pb: 2,
            textAlign: 'left',
          }}
        >
          <ButtonAtom
            variant="filled"
            startIcon={<ArrowBackIcon />}
            color="primary"
            onClick={() => navigate('/register')}
            sx={{
              width: { xs: '100%', md: '50%' },
              mb: 2,
              alignContent: 'left',
            }}
          >
            Volver al registro
          </ButtonAtom>
        </Box>
      </Box>
    </Fade>
  );
};

export default PrivacyPolicy;
