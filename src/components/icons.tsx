import type { SVGProps } from "react";

export function CO2Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 16h4a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4" />
      <path d="M8 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4 12h4" />
      <path d="M18 12h2" />
      <path d="m14.5 10.5 3 3" />
      <path d="m17.5 10.5-3 3" />
    </svg>
  );
}
