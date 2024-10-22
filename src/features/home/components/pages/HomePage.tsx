import { UserLayout } from '../../../../components/templates/UserLayout';
import { TextAtom } from '../../../../components/atoms';
import ServicesCard from '../../../../components/atoms/ServicesCard';
import { Box, Grid2 } from '@mui/material';
import RequestForm from '../../../home/components/organisms/RequestForm';
import Footer from '../../../../components/organisms/Footer';
import HighlightedCategories from '../organisms/Categories';


type ServicesSection = {
  name: string;
  image: string;
  pricePerHour: string;
  rating: number;
  reviewCount: number;
  jobsInQueue: number;
  [key: string]: unknown;
};

export const HomePage: React.FC = () => {
  // const authState = useAppSelector(selectAuth);
  // const { data } = useGetExampleDataQuery();

  const services: ServicesSection[] = [
    {
      name: 'José Perez',
      image: 'src/assets/images/services/Jose_Perez.svg',
      pricePerHour: 'Q30',
      rating: 4.5,
      reviewCount: 4,
      jobsInQueue: 2,
    },
    {
      name: 'Roberto Castro',
      image: 'src/assets/images/services/Roberto_Castro.svg',
      pricePerHour: 'Q18',
      rating: 4.6,
      reviewCount: 5,
      jobsInQueue: 3,
    },
    {
      name: 'Juan García',
      image: 'src/assets/images/services/Juan_Garcia.svg',
      pricePerHour: 'Q18',
      rating: 4.5,
      reviewCount: 4,
      jobsInQueue: 3,
    },
    {
      name: 'Carlos Blanco',
      image: 'src/assets/images/services/Carlos_Blanco.svg',
      pricePerHour: 'Q18',
      rating: 4.5,
      reviewCount: 4,
      jobsInQueue: 3,
    },
    {
      name: 'Pedro Martínez',
      image: 'src/assets/images/services/Pedro_Martinez.svg',
      pricePerHour: 'Q18',
      rating: 4.5,
      reviewCount: 4,
      jobsInQueue: 1,
    },
  ];

  return (
    <UserLayout>
      <TextAtom variant="display" size="medium" fontWeight="bold">
        Home Page
      </TextAtom>
      <HighlightedCategories />
      <RequestForm />
      <Box sx={{ position: 'relative', padding: 4 }}>
        <TextAtom
          variant="title"
          size="large"
          fontWeight="bold"
          marginBottom={2}
        >
          Recomendados para ti
        </TextAtom>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <Grid2
          container
          spacing={2}
          sx={{
            overflowX: 'auto',
            flexWrap: 'nowrap',
            scrollBehavior: 'smooth',
            flexGrow: 1,
            width: '100%',
          }}
        >
          {services.map((service, index) => (
            <Grid2 key={index}>
              <ServicesCard {...service} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Footer />
    </UserLayout>
  );
};
