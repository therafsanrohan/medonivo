export const tokens = {
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem'  // 36px
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  },
  colors: {
    brand: {
      50: '#F0F7FF',
      100: '#E0EFFE',
      500: '#0284C7',
      600: '#0369A1',
      700: '#075985',
      900: '#0C4A6E'
    },
    neutral: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A'
    },
    status: {
      success: {
        bg: '#F0FDF4',
        border: '#BBF7D0',
        text: '#166534'
      },
      warning: {
        bg: '#FFFBEB',
        border: '#FDE68A',
        text: '#92400E'
      },
      error: {
        bg: '#FEF2F2',
        border: '#FECACA',
        text: '#991B1B'
      },
      info: {
        bg: '#EFF6FF',
        border: '#BFDBFE',
        text: '#1E40AF'
      }
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px'
  },
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '9999px'
  },
  breakpoints: {
    mobileSm: '360px',
    mobileLg: '390px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1440px'
  }
} as const;

export type DesignTokens = typeof tokens;
