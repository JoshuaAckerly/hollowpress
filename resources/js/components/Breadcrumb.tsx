import { Link } from '@inertiajs/react';
import React from 'react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
    return (
        <nav aria-label="breadcrumb" className={className}>
            <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-400">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className="flex items-center gap-1">
                            {index > 0 && (
                                <span className="select-none text-gray-600" aria-hidden="true">
                                    /
                                </span>
                            )}
                            {isLast || !item.href ? (
                                <span
                                    className="text-gray-200"
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="transition-colors hover:text-gray-200"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
