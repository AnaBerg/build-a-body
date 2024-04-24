<<<<<<< HEAD
import { getExercisesForAccordion } from '@/server/queries';
import AddFormContainer from './_components/FormContainer';

const AddPage: React.FC = async () => {
  const accordions = await getExercisesForAccordion();

  return <AddFormContainer accordions={accordions} />;
=======
const AddPage: React.FC = () => {
  return <>AddPage</>;
>>>>>>> 75c1a6d (feat: split page (#10))
};

export default AddPage;
