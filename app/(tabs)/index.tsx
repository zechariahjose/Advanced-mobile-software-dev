import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

useEffect(() => {
  // By default, go to login page first
  router.replace('/spotify');
}, []);

  return null;
}




// import { useRouter } from 'expo-router';
// import { useEffect } from 'react';
//
// export default function Index() {
//   const router = useRouter();
//
//   useEffect(() => {
//     const isLoggedIn = false;
//     if (isLoggedIn) {
//       router.replace('/homePage');
//     } else {
//       router.replace('/spotify');
//     }
//   }, []);
//
//   return null;
// }
