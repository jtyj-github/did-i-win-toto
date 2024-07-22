export const formatAmount = (number: number, options?: Intl.NumberFormatOptions): string =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'SGD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
        ...options
    }).format(number);
