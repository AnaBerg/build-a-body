'use client';

import { Accordion as MtAccordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { useState } from 'react';
import ArrowIcon from './components/ArrowIcon';

interface AccordionProps extends React.PropsWithChildren {
  title: string;
  startOpen?: boolean;
  showDivider?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  startOpen = false,
  showDivider = true,
}) => {
  const [open, setOpen] = useState(startOpen);

  return (
    <MtAccordion open={open} icon={<ArrowIcon open={open} />} placeholder="">
      <AccordionHeader
        className={`border-gray-400 p-2.5 ${!showDivider && !open ? 'border-none' : ''}`}
        placeholder=""
        onClick={() => setOpen(!open)}
      >
        <p>{title}</p>
      </AccordionHeader>
      <AccordionBody>{children}</AccordionBody>
    </MtAccordion>
  );
};

export default Accordion;
