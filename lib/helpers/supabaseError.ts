import { PostgrestError } from '@supabase/supabase-js';

const supabaseError = (message: string, error: PostgrestError) => {
  throw new Error(`${message}: ${error.message}`, { cause: error.details });
};

export default supabaseError;
