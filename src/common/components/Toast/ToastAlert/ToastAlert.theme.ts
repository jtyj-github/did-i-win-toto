import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export type ToastAlertVariants = VariantProps<typeof toastAlertTheme>;

export const toastAlertTheme = tv({
    slots: {
        wrapper: [
            'group',
            'pointer-events-auto',
            'relative',
            'flex',
            'w-full',
            'items-center',
            'justify-between',
            'space-x-4',
            'rounded-lg',
            'border',
            'border-border-base',
            'pl-3',
            'pr-3',
            'pt-2',
            'pb-2',
            'mt-2',
            'shadow-md',
            'transition-all',
            'duration-500',
            'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
            'data-[swipe=move]:transition-none',
            'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
            'data-[swipe=end]:animate-out',
            'data-[swipe=end]:animate-out',
            'data-[swipe=end]:duration-500',
            'data-[swipe=end]:ease-out',
            'data-[swipe=cancel]:translate-x-0',
            'data-[swipe=cancel]:transition-[transform_200ms_ease-out]',
            'data-[state=open]:animate-in',
            'data-[state=open]:slide-in-from-right-full',
            'data-[state=open]:sm:slide-in-from-right-full',
            'data-[state=open]:duration-500',
            'data-[state=open]:ease-[cubic-bezier(0.34,_1.05,_1,_1)]',
            'data-[state=closed]:animate-out',
            'data-[state=closed]:slide-out-to-right-full',
            'data-[state=closed]:fade-out',
            'data-[state=closed]:duration-500',
            'data-[state=closed]:duration-500'
        ],
        title: ['text-sm', 'font-medium'],
        description: ['text-sm', 'text-text-em-mid'],
        icon: ['flex-shrink-0', 'self-start', 'mt-0.5'],
        close: [
            'invisible',
            'group-hover:visible',
            '-top-4',
            '-right-4',
            'absolute',
            'grid',
            'place-content-center',
            'p-1.5',
            'text-text-em-mid',
            'bg-surface-base',
            'border',
            'rounded-full',
            'border-border-base'
        ]
    },
    variants: {
        variant: {
            default: {
                wrapper: ['bg-surface-elevated'],
                title: ['text-text-em-high'],
                icon: ['text-success']
            },
            success: {
                wrapper: ['bg-element-success'],
                title: ['text-text-on-success'],
                icon: ['text-text-on-success']
            },
            warning: {
                wrapper: ['bg-element-warning'],
                title: ['text-text-on-warning'],
                icon: ['text-text-on-warning']
            },
            error: {
                wrapper: ['bg-element-error'],
                title: ['text-text-on-error'],
                icon: ['text-text-on-error']
            },
            destructive: {
                wrapper: [
                    'destructive',
                    'group',
                    'border-text-on-error/25',
                    'bg-element-error',
                    'text-text-on-error'
                ]
            }
        },
        hasIcon: {
            true: {
                wrapper: ['pl-2']
            }
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
