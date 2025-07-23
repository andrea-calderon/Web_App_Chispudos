import React from 'react';
import { Box } from '@mui/material';
import { TextAtom, ButtonAtom } from '../../../../components/atoms';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Fade } from '@mui/material';
import AppLogo from '../../../../components/molecules/AppLogo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const terms = {
  title: 'Términos y condiciones',
  subTitle: 'Última actualización: 25 de julio de 2025',
  message: '¡Gracias por utilizar Reco!',
  content: `

1. Aceptación de los Términos
Al acceder o utilizar Reco (plataforma web o aplicación móvil), usted acepta estos Términos y Condiciones, nuestra Política de Privacidad y todas las políticas aplicables. Si no está de acuerdo, absténgase de usar nuestros servicios.
Para usar Reco debe ser mayor de 18 años y tener capacidad legal para contratar en Guatemala.

2. Definiciones
"Usuario": Quien busca servicios profesionales.
"Profesional": Quien ofrece servicios a través de Reco.
"Plataforma": Sitio web, app móvil y servicios asociados de Reco.

3. Servicios de Reco
Reco actúa como intermediario tecnológico para conectar Usuarios con Profesionales. No somos empleadores ni responsables por la calidad, seguridad o legalidad de los servicios prestados por los Profesionales.

4. Registro y Cuentas
Debe proporcionar información verídica y actualizada.
Es responsable de la confidencialidad de su cuenta y todas las actividades bajo ella.
Reco se reserva el derecho de suspender cuentas por información falsa o conducta inapropiada.

5. Permisos de la App Móvil
Al usar la app, usted autoriza expresamente:
Ubicación: Para mostrar Profesionales cercanos y mejorar recomendaciones (puede desactivarlo en ajustes del dispositivo).
Cámara y Galería: Para subir fotos de proyectos o verificar identidad de Profesionales.
Notificaciones: Para recibir actualizaciones de contrataciones, mensajes y promociones.
(Estos permisos se gestionan según nuestra Política de Privacidad y puede revocarlos en cualquier momento).

6. Responsabilidades del Usuario y Profesional
Usuarios:
Evaluar la idoneidad del Profesional (verificando reseñas, credenciales, etc.).
No realizar pagos fuera de la Plataforma (excepto propinas post-servicio).
Profesionales:
Cumplir con todas las leyes locales (impuestos, licencias, seguros).
Garantizar la exactitud de su perfil, precios y disponibilidad.
Prohibido para ambos:
Uso con fines ilegales, fraude o acoso.
Copiar/concurrencia desleal usando datos de Reco.

7. Contratación y Pagos
Modelo actual: Gratuito para conexiones básicas.
Futuros modelos: Reco podrá implementar sistemas de pago, suscripciones o publicidad, notificándolo con 30 días de antelación.
Disputas: Cualquier conflicto entre Usuario y Profesional debe resolverse entre las partes. Reco podrá mediar a discreción, sin obligación legal.

8. Contenido Generado por Usuarios
Usted otorga a Reco una licencia no exclusiva para usar fotos, reseñas y otros contenidos subidos a la Plataforma.
Prohibido subir contenido difamatorio, violento o que infrinja derechos de terceros.

9. Limitación de Responsabilidad
Reco no garantiza:
La disponibilidad, puntualidad o calidad de los servicios de los Profesionales.
La exactitud de perfiles o reseñas.
Daños derivados del uso de la Plataforma (ej.: fallos técnicos, malware).
La responsabilidad máxima de Reco será el monto pagado por usted en los últimos 6 meses.

10. Privacidad y Datos
El uso de datos personales (ubicación, fotos, contacto) se rige por nuestra Política de Privacidad, cumpliendo con la Ley de Protección de Datos Personales de Guatemala (Ley 57-2008).

11. Propiedad Intelectual
Todos los derechos sobre la Plataforma (software, logos, contenido) son propiedad de Reco o sus licenciantes. Queda prohibida su reproducción sin autorización.

12. Modificaciones y Terminación
Reco puede actualizar estos Términos notificándolo con 15 días de antelación. El uso continuado implica aceptación.
Puede cerrar su cuenta en cualquier momento. Reco podrá suspender servicios por incumplimiento grave.

13. Ley Aplicable y Resolución de Conflictos
Se rigen por las leyes de Guatemala.
Cualquier disputa se resolverá mediante negociación obligatoria y, de persistir, en los tribunales de la Ciudad de Guatemala.

14. Contacto
Para preguntas legales: legal@recolatam.com \n
Dirección física: Residenciales San Jose, San José Pinula, Guatemala.`,
};

const TermsAndConditions: React.FC = () => {
  const sections = terms.content.split('\n\n');
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
        <Box sx={{ mb: 4, textAlign: 'left' }}>
          <AppLogo sx={{ width: 100, height: 'auto' }} />
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
            {terms.title}
          </TextAtom>
          <br />
          <TextAtom
            variant="body"
            size="large"
            fontWeight="bold"
            sx={{
              mb: 2,
              textAlign: 'center',
            }}
          >
            {terms.subTitle}
          </TextAtom>
          <br />
          <br />
          <TextAtom
            variant="body"
            size="large"
            sx={{
              mb: 2,
              textAlign: 'center',
            }}
          >
            {terms.message}
          </TextAtom>
        </Box>

        <br />
        {sections.map((section, idx) => {
          // Si la sección empieza con número y punto, es un título de sección
          const match = section.match(/^(\d+)\.\s(.+)/);
          if (match) {
            return (
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
                  {`${match[1]}. ${match[2].split('\n')[0]}`}
                </TextAtom>
                <TextAtom variant="body" size="medium" sx={{ mb: 1 }}>
                  {section.replace(`${match[1]}. ${match[2]}`, '').trim()}
                </TextAtom>
              </Box>
            );
          }

          return (
            <TextAtom key={idx} variant="body" size="medium" sx={{ mb: 2 }}>
              {section}
            </TextAtom>
          );
        })}
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#fff',
            zIndex: 10,
            pt: 4,
            pb: 2,
            textAlign: 'left',
            //boxShadow: 3,
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

export default TermsAndConditions;
