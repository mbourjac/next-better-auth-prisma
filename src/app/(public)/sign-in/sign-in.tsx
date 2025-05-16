'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { signIn } from '@/lib/auth-client';
import { FormCheckbox } from '../../../components/forms/form-checkbox';
import { FormInput } from '../../../components/forms/form-input';
import { SubmitButton } from '../../../components/forms/submit-button';
import { CenteredPage } from '../../../components/layout/centered-page';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { signInSchema, SignIn as SignInType } from './sign-in.schemas';

export const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async ({ email, password, rememberMe }: SignInType) => {
    await signIn.email({
      email,
      password,
      rememberMe,
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess: async () => {
          router.push('/dashboard');
        },
        onError: (context) => {
          toast.error(context.error.message);
        },
      },
    });
  };

  return (
    <CenteredPage>
      <Card className="w-[27.25rem] max-w-full rounded-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <FormInput
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="john.doe@example.com"
                  type="email"
                  autoComplete="email"
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/reset-password"
                          className="text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormCheckbox
                  form={form}
                  name="rememberMe"
                  label="Remember me"
                />
                <SubmitButton isLoading={isLoading}>Login</SubmitButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </CenteredPage>
  );
};
