import { getExercisesForAccordion } from '@/server/queries';
import SplitFormContainer from '../_components/FormContainer';

const AddPage: React.FC = async () => {
  const accordions = await getExercisesForAccordion();

  return <SplitFormContainer accordions={accordions} />;
};

export default AddPage;
