import { useNavigate } from 'react-router-dom';
import { UserLayout } from '../../../../components/templates/UserLayout';
import ProfileCard from '../../../../components/atoms/ProfileCard';

type Service = {
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
};

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const service: Service = {
    name: 'Servicio de Jardinería',
    description:
      'Ofrecemos servicios profesionales de jardinería y paisajismo.',
    image: 'https://via.placeholder.com/140',
    rating: 4.5,
    reviewCount: 4,
    location: 'San José Pinula',
  };

  return (
    <UserLayout>
      <h1>Profile Page</h1>

      <ProfileCard
        name={service.name}
        description={service.description}
        image={service.image}
        rating={service.rating}
        reviewCount={service.reviewCount}
        location={service.location}
      />

      <button onClick={() => navigate('/home')}>Home</button>
      <button onClick={() => navigate('/')}>Landing</button>
    </UserLayout>
  );
};
