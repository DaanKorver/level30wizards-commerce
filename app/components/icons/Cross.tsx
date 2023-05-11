import * as React from 'react';
import type {SVGProps} from 'react';
import {Ref, forwardRef} from 'react';
const SvgCross = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
    className="cross_svg__lucide cross_svg__lucide-x"
    viewBox="0 0 24 24"
    ref={ref}
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const ForwardRef = forwardRef(SvgCross);
export default ForwardRef;
