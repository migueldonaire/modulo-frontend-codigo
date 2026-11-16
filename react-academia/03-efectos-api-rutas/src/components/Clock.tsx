import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState(() => new Date()); // la hora al aparecer

  useEffect(() => {
    // Cada segundo, guarda la hora nueva
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // La limpieza: para el intervalo
    return () => {
      clearInterval(interval);
    };
  }, []); // solo al aparecer

  return <span>{time.toLocaleTimeString("es-ES")}</span>;
}
