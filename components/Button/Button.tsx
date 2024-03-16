'use client';

import { Button as MtButton } from '@material-tailwind/react';

interface ButtonProps extends React.PropsWithChildren {
  variant?: 'filled' | 'text';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'submit' | 'button' | 'reset';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'filled',
  onClick,
  type,
  isLoading = false,
  fullWidth = false,
}) => {
  return (
    <MtButton
      loading={isLoading}
      className="rounded-sm"
      color="white"
      type={type}
      onClick={onClick}
      placeholder=""
      variant={variant}
      fullWidth={fullWidth}
    >
      {children}
    </MtButton>
  );
};

export default Button;
