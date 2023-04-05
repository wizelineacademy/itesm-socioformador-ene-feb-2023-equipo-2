// useHasMounted.tsx is used to ensure correct server-side rendering in Next.JS when using the react-select library.
// Next.JS can generate a Hydration Error (https://stackoverflow.com/questions/72499480/using-react-select-with-nextjs-causes-hydration-error-when-select-element)
// This issue is further explained in this article: https://www.joshwcomeau.com/react/the-perils-of-rehydration/#the-solution-9
// In summary, we need to ensure that the rehydrated app matches the original HTML.
// The useHasMounted.tsx file is created to be used in multiple pages, and can be imported like so: import { useHasMounted } from "@/components/useHasMounted" and used with this code: const hasMounted = useHasMounted();
// To prevent the error from appearing, we can use the following code:
// import { useHasMounted } from "@/components/useHasMounted";
// const hasMounted = useHasMounted();
// if (!hasMounted) {
//   return null;
// }

import React from "react";

// Custom hook to check if the component has mounted
export function useHasMounted() {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}