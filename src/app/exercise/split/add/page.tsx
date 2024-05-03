import { getExercisesForAccordion } from '@/server/queries';
import AddFormContainer from './_components/FormContainer';

const AddPage: React.FC = async () => {
  const accordions = await getExercisesForAccordion();

  return <AddFormContainer accordions={accordions} />;
};

export default AddPage;
