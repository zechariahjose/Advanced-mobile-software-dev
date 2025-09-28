// app/_index.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function IndexGate() {
  const router = useRouter();

  useEffect(() => {
    // Always redirect to login screen
    router.replace("/auth/spotify");
  }, []);

  return null; // shows nothing while redirecting
}
