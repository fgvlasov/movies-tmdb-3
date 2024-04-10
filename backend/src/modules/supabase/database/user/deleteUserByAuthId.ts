import { supabaseCli } from '@/modules/supabase/init.js';

export const deleteUserByAuthId = async (authId) => {
  if (!authId) {
    throw new Error('Auth ID is required to delete a user');
  }

  try {
    const { data, error } = await supabaseCli
      .from('users')
      .delete()
      .eq('auth_id', authId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error deleting user', error);
    throw error;
  }
};
