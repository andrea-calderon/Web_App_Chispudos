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

  const services: Service[] = [
    {
      name: 'José Pérez',
      description:
        'Se especializa en la instalación y mantenimiento de sistemas para agua potable, alcantarillado y drenaje en sistemas de plomería.',
      image: 'src/assets/images/cards/Jose_Perez.svg',
      rating: 4.5,
      reviewCount: 4,
      location: 'San José Pinula',
    },
  ];

  return (
    <UserLayout>
      <h1>Profile Page</h1>

      {services.map((service, i) => (
        <ProfileCard
          key={i}
          name={service.name}
          description={service.description}
          image={service.image}
          rating={service.rating}
          reviewCount={service.reviewCount}
          location={service.location}
        />
      ))}
      <br />
      <button onClick={() => navigate('/home')}>Home</button>

      <button onClick={() => navigate('/')}>Landing</button>
    </UserLayout>
  );
};
