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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormInput } from '../../../components/forms/form-input';
import { SubmitButton } from '../../../components/forms/submit-button';
import { CenteredPage } from '../../../components/layout/centered-page';
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
    <CenteredPage>
      <Card className="w-[27.25rem] max-w-full rounded-md">
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
                    autoComplete="given-name"
                  />
                  <FormInput
                    form={form}
                    name="lastName"
                    label="Last name"
                    placeholder="Doe"
                    autoComplete="family-name"
                  />
                </div>
                <FormInput
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="john.doe@example.com"
                  type="email"
                  autoComplete="email"
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
                <SubmitButton isLoading={isLoading}>
                  Create an account
                </SubmitButton>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-medium underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </CenteredPage>
  );
};
