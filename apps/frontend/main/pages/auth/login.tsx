import { AuthLayout } from '../../components/auth/AuthLayout';
import { LoginForm } from '../../components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <AuthLayout title="Login">
      <LoginForm />
      <p className="mt-4 text-center text-sm">
        Don’t have an account?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
