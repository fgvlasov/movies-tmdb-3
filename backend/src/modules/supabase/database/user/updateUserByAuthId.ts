import { supabaseCli } from '@/modules/supabase/init.js';

export const updateUserByAuthId = async (authId, updateData) => {
  if (!authId || !updateData) {
    throw new Error('Missing authId or updateData');
  }
  console.log('Data to update in DB: ', updateData);

  try {
    const { data, error } = await supabaseCli
      .from('users')
      .update(updateData)
      .eq('auth_id', authId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Fail to update user', error);
    throw error;
  }
};
