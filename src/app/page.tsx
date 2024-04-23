import ComingSoon from '@/components/ComingSoon';

const HomePage: React.FC = () => {
  return (
    <main className="flex h-[calc(100vh-60px)]">
      <ComingSoon pageName="Home Page" />
    </main>
  );
};

export default HomePage;
