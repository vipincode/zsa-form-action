'use server';
import { createServerAction } from 'zsa';
import { registerFormSchema } from '@/schema/form-schema';
import { prisma } from '@/config/prisma';

export const registerAction = createServerAction()
  .input(registerFormSchema)
  .handler(async ({ input }) => {
    console.log(input);
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        username: input.username,
        password: input.password,
      },
    });
    console.log('Data send to mongo db', user);
    return { success: true };
  });
