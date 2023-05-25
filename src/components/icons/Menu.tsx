import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgMenu = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="menu_svg__lucide menu_svg__lucide-menu"
    viewBox="0 0 24 24"
    ref={ref}
  >
    <path d="M4 12h16M4 6h16M4 18h16" />
  </svg>
);
const ForwardRef = forwardRef(SvgMenu);
export default ForwardRef;
