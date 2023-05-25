import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgCart = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
    className="cart_svg__lucide cart_svg__lucide-shopping-cart"
    viewBox="0 0 24 24"
    ref={ref}
  >
    <circle cx={8} cy={21} r={1} />
    <circle cx={19} cy={21} r={1} />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);
const ForwardRef = forwardRef(SvgCart);
export default ForwardRef;
