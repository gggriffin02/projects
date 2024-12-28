/**
 *CHANGE THIS WHEN WE IMPLEMENT LOGIN PAGE
 */

// import { useEffect, useState } from "react";

// export default function useSession() {
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     db.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });

//     const {
//       data: { subscription },
//     } = db.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   return session;
// }
