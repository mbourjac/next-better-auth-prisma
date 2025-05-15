import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { CenteredPage } from '@/components/layout/centered-page';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const EmailVerified = () => {
  return (
    <CenteredPage>
      <Card className="w-[27.25rem] max-w-full rounded-md">
        <CardHeader className="flex flex-col items-center">
          <CheckCircle2 className="size-6" />
          <CardTitle className="text-lg md:text-xl">
            <h1>Email Verified!</h1>
          </CardTitle>
          <CardDescription className="text-center text-xs text-pretty md:text-sm">
            Your email address has been successfully verified.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <p className="text-center text-gray-600">
            You can now access all features.
          </p>
          <Link href="/dashboard" className="block w-full">
            <Button className="w-full" size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </CenteredPage>
  );
};
