'use client';
// eslint-disable-next-line import/named
import { Icon as Iconify, IconifyIconProps } from '@iconify-icon/react';

type IconProps = Omit<IconifyIconProps, 'ref'>;

export const Icon = (props: IconProps) => <Iconify {...props} />;
