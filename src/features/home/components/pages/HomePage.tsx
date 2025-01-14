import { UserLayout } from '../../../../components/templates/UserLayout';
import { TextAtom } from '../../../../components/atoms';
import ServicesCard from '../../../../components/atoms/ServicesCard';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Footer from '../../../../components/organisms/Footer';
import HighlightedCategories from '../organisms/Categories';
import { useSearchServicesFormData } from '../../../../context/SearchContext';
import SearchForm from '../../../../components/organisms/SearchForm';

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
  const { searchData } = useSearchServicesFormData();

  // Simulación de servicios basados en el filtro de búsqueda
  const allServices: ServicesSection[] = [
    {
      name: 'José Perez',
      image: 'https://picsum.photos/345/180?random=1',
      pricePerHour: 'Q30',
      rating: 4.5,
      reviewCount: 4,
      jobsInQueue: 2,
    },
    {
      name: 'Roberto Castro',
      image: 'https://picsum.photos/345/180?random=1',
      pricePerHour: 'Q18',
      rating: 4.6,
      reviewCount: 5,
      jobsInQueue: 3,
    },
    {
      name: 'Juan García',
      image: 'https://picsum.photos/345/180?random=1',
      pricePerHour: 'Q18',
      rating: 4.5,
      reviewCount: 4,
      jobsInQueue: 3,
    },
    {
      name: 'Carlos Blanco',
      image: 'https://picsum.photos/345/180?random=1',
      pricePerHour: 'Q18',
      rating: 4.5,
      reviewCount: 4,
      jobsInQueue: 3,
    },
    {
      name: 'Pedro Martínez',
      image: 'https://picsum.photos/345/180?random=1',
      pricePerHour: 'Q18',
      rating: 4.5,
      reviewCount: 4,
      jobsInQueue: 1,
    },
    {
      name: 'José Perez',
      image: 'https://picsum.photos/345/180?random=1',
      pricePerHour: 'Q30',
      rating: 4.5,
      reviewCount: 4,
      jobsInQueue: 2,
    },
    {
      name: 'Roberto Castro',
      image: 'https://picsum.photos/345/180?random=1',
      pricePerHour: 'Q18',
      rating: 4.6,
      reviewCount: 5,
      jobsInQueue: 3,
    }
    
  ];

  return (
    <UserLayout>
      <HighlightedCategories />
      <SearchForm />
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
      <Box>
      
      <Box>
         <Grid
          container
          spacing={1}

          sx={{
            overflowX: 'auto',
            
            scrollBehavior: 'smooth',
            flexGrow: 1,
            width: '100%',
          }}
        >
          {allServices.map((service, index) => (
            <Grid key={index} size={{ xs: 6, md: 3 , lg:2}}>
              <ServicesCard {...service} />
            </Grid>
            
          ))}
        </Grid>
        </Box>
      </Box>
      <Footer />
    </UserLayout>
  );
};

export default HomePage;
