'use client';

import { useState } from 'react';
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
import { FormInput } from '../../../components/forms/form-input';
import { SubmitButton } from '../../../components/forms/submit-button';
import { CenteredPage } from '../../../components/layout/centered-page';
import { Checkbox } from '../../../components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../components/ui/form';
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
                <FormInput
                  form={form}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer">
                          Remember me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
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
