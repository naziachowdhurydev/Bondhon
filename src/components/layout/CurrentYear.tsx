"use client";

import { useEffect, useState } from "react";

const CurrentYear = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setYear(new Date().getFullYear());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return <>{year ?? ""}</>;
};

export default CurrentYear;
