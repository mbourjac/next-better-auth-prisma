'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormInput } from '../../../components/forms/form-input';
import { Form } from '../../../components/ui/form';
import { signUp } from '../../../lib/auth-client';
import { SignUp as SignUpType, signUpSchema } from './sign-up.schemas';

export const SignUp = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpType) => {
    await signUp.email({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
      callbackURL: '/dashboard',
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess: async () => {
          router.push('/sign-in');
        },
        onError: (context) => {
          toast.error(context.error.message);
        },
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="max-w-md rounded-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            <h1>Sign Up</h1>
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    form={form}
                    name="firstName"
                    label="First name"
                    placeholder="John"
                  />
                  <FormInput
                    form={form}
                    name="lastName"
                    label="Last name"
                    placeholder="Doe"
                  />
                </div>
                <FormInput
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="john.doe@example.com"
                  type="email"
                />
                <FormInput
                  form={form}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                />
                <FormInput
                  form={form}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    'Create an account'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
