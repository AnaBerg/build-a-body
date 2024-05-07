import { getExercisesForAccordion, getSplitById } from '@/server/queries';
import SplitFormContainer from '../../_components/FormContainer';

interface EditByIdPageProps {
  params: {
    id: string;
  };
}

const EditByIdPage: React.FC<EditByIdPageProps> = async ({ params }) => {
  const accordions = await getExercisesForAccordion();
  const split = await getSplitById(params.id!);
  const editDefaultValues = {
    amount: split.splitDays.length.toString(),
    day1: split.splitDays[0]?.name ?? '',
    day2: split.splitDays[1]?.name ?? '',
    day3: split.splitDays[2]?.name ?? '',
    day4: split.splitDays[3]?.name ?? '',
    day5: split.splitDays[4]?.name ?? '',
    day6: split.splitDays[5]?.name ?? '',
    day7: split.splitDays[6]?.name ?? '',
    name: split.name,
  };

  const exercises = () => {
    let exe: any = {};

    split.splitDays.forEach(({ exercises }, i) => {
      const key = `day${i + 1}`;
      exe = { ...exe, [key]: exercises };
    });

    return exe;
  };

  return (
    <SplitFormContainer
      editDefaultValues={editDefaultValues}
      accordions={accordions}
      editExercises={exercises()}
    />
  );
};

export default EditByIdPage;
