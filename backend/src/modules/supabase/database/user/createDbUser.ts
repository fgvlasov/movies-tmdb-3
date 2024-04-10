import { supabaseCli } from '@/modules/supabase/init.js';

export const createDbUser = async (userData) => {
  try {
    // console.log("USERDATA: ", userData)

    const { data, error } = await supabaseCli.from('users').insert(userData);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error creating auth user', error.message);
    throw error;
  }
};
