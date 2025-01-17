'use client';
import { registerAction } from '@/actions/register';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerFormSchema } from '@/schema/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { toast } from 'sonner';

export default function RegisterForm() {
  const { isPending, execute, data, reset } = useServerAction(registerAction);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // console.log(values);
    const [data, err] = await execute(values);
    if (err) {
      console.error(err);
      toast.error('An error occur please try again.');
    } else if (data) {
      console.log(data);
      toast.success('User register successfully');
      reset();
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-gray-200">
      <div className="space-y-3 w-full max-w-[600px] text-center px-[50px] mb-6">
        <h1 className="text-lg font-semibold text-gray-700">ZSA Server Action in Next.JS Apps</h1>
        <p className="text-xs font-normal text-gray-600 mb-2 leading-5">
          zsa is the best library for building typesafe server actions in NextJS. Built for a simple, scalable developer
          experience, Validated inputs/outputs with zod
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-[400px] bg-white p-4 rounded-sm">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="your username" {...field} />
                </FormControl>
                <FormDescription className="text-xs">This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? 'saving...' : 'Register user'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
