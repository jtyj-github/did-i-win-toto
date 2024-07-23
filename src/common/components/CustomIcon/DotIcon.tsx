import { CustomIcon, CustomIconProps } from './CustomIcon';

export const DotIcon = (props: CustomIconProps) => {
  return (
    <CustomIcon height="16" viewBox="0 0 16 16" width="16" {...props}>
      <circle cx="8" cy="8" fill="currentColor" r="4" />
    </CustomIcon>
  );
};
