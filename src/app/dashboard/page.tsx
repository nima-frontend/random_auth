import LogoutButton from '@/components/LogoutButton'
import styles from './dashboard.module.scss'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'


type TokenPayload = {
  name:string,
  avatar:string,
  phone:string
}


export default async function Dashboard() {

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value

   if (!token) return <p>Unauthorized</p>
   let user: TokenPayload | null = null
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
  } catch {
    return <p>Invalid token</p>
  }

  return (
    <section className={styles.section}>
      <div>
        <div className={styles.imgWrapper}>
          <img src={user.avatar} alt="avatar" />
        </div>
        <strong>نام:{user.name}</strong>
        <br />
        <strong>تلفن:{user.phone}</strong>
        <br />
        <div className={styles.textWrapper}>
        <strong>صفحه داشبورد</strong>
        <p>پروژه جهت ایجاد کاربر تصادفی و ذخیره اطلاعات جهت احراز هویت</p>
        </div>
        <LogoutButton />
      </div>
    </section>
  )
}
