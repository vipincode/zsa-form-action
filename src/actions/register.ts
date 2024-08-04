'use server';
import { createServerAction } from 'zsa';
import { registerFormSchema } from '@/schema/form-schema';
import { prisma } from '@/config/prisma';
import bcrypt from 'bcrypt';

export const registerAction = createServerAction()
  .input(registerFormSchema)
  .handler(async ({ input }) => {
    console.log(input);
    const hashPassword = await bcrypt.hash(input.password, 10);
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        username: input.username,
        password: hashPassword,
      },
    });
    console.log('Data send to mongo db', user);
    return { success: true };
  });
