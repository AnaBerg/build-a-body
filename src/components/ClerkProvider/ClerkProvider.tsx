import { ClerkProvider as CP } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const ClerkProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <CP
      appearance={{
        baseTheme: [dark],
        variables: {
          colorPrimary: '#16a34a',
          colorBackground: '#0C0A09',
          borderRadius: '0.5rem',
        },
      }}
    >
      {children}
    </CP>
  );
};

export default ClerkProvider;
