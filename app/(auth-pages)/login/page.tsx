import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-background">
      <form
        className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md"
        action={signInAction}
      >
        <h1 className="text-2xl font-semibold mb-2 text-center">Sign in</h1>
        <p className="text-sm text-center text-muted-foreground mb-6">
          Don't have an account?{" "}
          <Link className="text-primary underline" href="/sign-up">
            Sign up
          </Link>
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-xs text-primary underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
          </div>

          <SubmitButton pendingText="Signing In...">Sign in</SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
