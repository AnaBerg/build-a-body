import { Paper, Accordion } from '@/components';
import ExerciseForm from './_components/ExerciseFrom';
import { findUserExercisesByWorkoutId } from '@/lib/services/workoutService';

interface WorkoutTrackerPageProps {
  searchParams: {
    id?: string;
  };
}

const WorkoutTrackerPage: React.FC<WorkoutTrackerPageProps> = async ({ searchParams: { id } }) => {
  const exercises = await findUserExercisesByWorkoutId(id!);

  return (
    <div className="flex w-full flex-col gap-2">
      {exercises.map(({ name, sets, technique, id: exerciseId }, i) => (
        <Accordion key={i} title={name}>
          <ExerciseForm sets={sets} name={name} technique={technique} exerciseId={exerciseId} />
        </Accordion>
      ))}
    </div>
  );
};

export default WorkoutTrackerPage;
