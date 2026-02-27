'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/common/utils/cn';

const tabs = [
    { label: 'Draw', href: '/' },
    { label: 'Analytics', href: '/analytics' }
];

export const NavBar = () => {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-header border-b border-white/10 bg-blue-900/60 backdrop-blur-md">
            <div className="mx-auto flex max-w-screen-xl items-center gap-1 px-4 md:px-8">
                {tabs.map((tab) => {
                    const isActive =
                        tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);

                    return (
                        <Link
                            key={tab.href}
                            className={cn(
                                'relative px-4 py-3 text-sm font-medium transition-colors',
                                isActive
                                    ? 'text-text-em-high'
                                    : 'text-text-em-low hover:text-text-em-mid'
                            )}
                            href={tab.href}>
                            {tab.label}
                            {isActive && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-element-primary" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
