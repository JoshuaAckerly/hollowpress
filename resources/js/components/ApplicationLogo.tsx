import React from 'react';

const ApplicationLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {/* Example logo: a simple hollow circle with a press effect */}
        <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#222"
            strokeWidth="4"
            fill="none"
        />
        <circle
            cx="24"
            cy="24"
            r="12"
            stroke="#222"
            strokeWidth="2"
            fill="#fff"
        />
        <text
            x="24"
            y="28"
            textAnchor="middle"
            fontSize="10"
            fill="#222"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
        >
            HP
        </text>
    </svg>
);

export default ApplicationLogo;
