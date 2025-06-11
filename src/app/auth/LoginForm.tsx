'use client'
import { Phone } from 'lucide-react';
import styles from './login.module.scss';
import PhoneInput from '@/components/PhoneInput';
import { useState } from 'react';
import LoginButton from '@/components/LoginButton';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

export default function LoginForm() {
  const [phone, setPhone] = useState('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[1-9]\d{9}$/.test(phone)) {
    alert("شماره همراه باید ۱۰ رقم و بدون صفر در ابتدای آن باشد");
    return;
  }
    setIsPending(true)
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
        setIsPending(false)
        if (res.ok) {
      router.push('/dashboard');
    } else {
      console.log("Login failed");
    }
  };

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>ثبت نام</h1>
        <div className={styles.inputbox}>
          <Phone size={20} className={styles.icon} />
          <PhoneInput value={phone} onChange={setPhone} />
          <label htmlFor="phone">تلفن همراه</label>
        </div>
        <LoginButton pending={isPending} />
      </form>
    </section>
  );
}
