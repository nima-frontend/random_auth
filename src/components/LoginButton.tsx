'use client'

interface Props {
  pending: boolean;
}

export default function LoginButton({ pending }: Props) {
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'در حال ارسال...' : 'ورود'}
    </button>
  );
}
