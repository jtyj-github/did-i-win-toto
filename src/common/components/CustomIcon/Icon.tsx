'use client';
import { Icon as Iconify, type IconifyIconProps } from '@iconify-icon/react';

type IconProps = Omit<IconifyIconProps, 'ref'>;

export const Icon = (props: IconProps) => <Iconify {...props} />;
