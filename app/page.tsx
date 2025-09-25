import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Home</h1>
      
      <br />
      <Link href="/login">
        Ir a Login
      </Link>
    </main>
  );
}