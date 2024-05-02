'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Checkbox from '@/components/Checkbox';
import { useEffect } from 'react';

interface ExerciseModalProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  setExercises: React.Dispatch<React.SetStateAction<unknown>>;
  prevExercises?: Array<string>;
  accordions: Array<{
    title: string;
    value: string;
    exercises: Array<{ name: string; label: string }>;
  }>;
  day?: string;
}

const handleDefaultValues = (
  allExercises: Array<string>,
  prevExercises?: Array<string>
) => {
  if (!prevExercises) {
    return allExercises.reduce(
      (obj, exercise) => ({ ...obj, [exercise]: false }),
      {}
    );
  }

  return allExercises.reduce(
    (obj, exercise) => ({
      ...obj,
      [exercise]: prevExercises.includes(exercise),
    }),
    {}
  );
};

const ExerciseModal: React.FC<ExerciseModalProps> = ({
  onOpenChange,
  open,
  accordions,
  setExercises,
  day,
  prevExercises,
}) => {
  const allExercises = accordions.flatMap((accordion) =>
    accordion.exercises.flatMap((exercise) => exercise.name)
  );
  const formSchema = z.object(
    allExercises.reduce(
      (obj, exercise) => ({ ...obj, [exercise]: z.boolean() }),
      {}
    )
  );
  const defaultValues = handleDefaultValues(allExercises, prevExercises);

  const form = useForm<typeof formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<typeof formSchema> = (data) => {
    let selectedExercises: Array<string> = [];

    for (const key of Object.keys(data)) {
      if (data[key as keyof typeof data]) {
        selectedExercises.push(key);
      }
    }

    setExercises((p: any) => ({ ...p, [String(day)]: selectedExercises }));
    form.reset(defaultValues);
    onOpenChange(false);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exercises</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Accordion type="single" collapsible>
              {accordions.map(({ title, value, exercises }, i) => (
                <AccordionItem key={`${value}-${i}`} value={value}>
                  <AccordionTrigger>{title}</AccordionTrigger>
                  <AccordionContent className="grid grid-cols-4 gap-6">
                    {exercises.map((exercise, j) => (
                      <Checkbox
                        name={exercise.name}
                        label={exercise.label}
                        key={`${exercise.name}-${j}`}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <DialogFooter>
              <div className="pt-4">
                <Button type="submit">Add</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseModal;
