import { useState } from "react";

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  objectPosition?: string;
  width?: number;
  height?: number;
};

export function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  eager = false,
  objectPosition = "center",
  width,
  height,
}: PhotoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-dusk ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        draggable={false}
        onLoad={() => setLoaded(true)}
        style={{ objectPosition }}
        className={`h-full w-full object-cover transition-opacity duration-1000 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}
