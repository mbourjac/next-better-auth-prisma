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
import { Form } from '@/components/ui/form';
import { FormInput } from '../../../components/forms/form-input';
import { SubmitButton } from '../../../components/forms/submit-button';
import { CenteredPage } from '../../../components/layout/centered-page';
import {
  resetPasswordSchema,
  ResetPassword as ResetPasswordType,
} from './reset-password.schemas';

export const ResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ResetPasswordType) => {
    try {
      setIsLoading(true);
      console.log('data', data);
      router.push('/sign-in');
      toast.success('The email has been sent');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenteredPage>
      <Card className="w-[27.25rem] max-w-full rounded-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Reset your password
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email to receive a password reset link
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
                <SubmitButton isLoading={isLoading}>Send email</SubmitButton>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm">
            Remember your password?{' '}
            <Link href="/sign-in" className="font-medium underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </CenteredPage>
  );
};
