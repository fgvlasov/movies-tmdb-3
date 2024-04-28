import { createAuthUser } from '@/modules/supabase/auth/createAuthUser.js';
import { createDbUser } from '@/modules/supabase/database/user/createDbUser.js';
import { getUserByAuthId } from '@/modules/supabase/database/user/getUserByAuthId'

export const post_signup = async (req, res) => {
  let { email, password, username } = req.body;
  try {
    // Insert a new user into SB auth
    let authUser = await createAuthUser(email, password);

    // Insert a new user into SB table "user"
    await createDbUser({ auth_id: authUser.user.id, email, username });

    let dbUser = await getUserByAuthId(authUser.user.id)

    res.status(200).send({authUser, dbUser});
  } catch (error) {
    res.status(400).send('Failed to sing up', error);
  }
};
