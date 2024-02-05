import zod from "zod";

export const UserSchema = zod.object({
  name: zod.string("This is not a valid String").max(190),
  email: zod.string().email("this is not a valid email"),
  password: zod.string().min(6),
  profile: zod.string().optional(),
});
