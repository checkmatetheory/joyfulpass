export default function WaveDivider({
  color,
  flip = false,
}: {
  color: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className={`block h-16 w-full sm:h-24 ${flip ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path
        d="M0,32 C240,90 480,0 720,32 C960,64 1200,10 1440,48 L1440,100 L0,100 Z"
        fill={color}
      />
    </svg>
  );
}
