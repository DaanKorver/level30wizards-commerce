import * as React from 'react';
import type {SVGProps} from 'react';
import {Ref, forwardRef} from 'react';
const SvgUser = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
    className="user_svg__lucide user_svg__lucide-user-2"
    viewBox="0 0 24 24"
    ref={ref}
  >
    <circle cx={12} cy={8} r={5} />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);
const ForwardRef = forwardRef(SvgUser);
export default ForwardRef;
