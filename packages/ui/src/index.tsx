import React from 'react';
import { tokens } from '@medonivo/design-tokens';

// Accessibility helper: Focus outline styling
const focusOutlineStyle = `
  button:focus-visible, input:focus-visible {
    outline: 2px solid ${tokens.colors.brand[600]};
    outline-offset: 2px;
  }
`;

// Inject focus styles globally on run
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = focusOutlineStyle;
  document.head.appendChild(style);
}

// --- BUTTON & ICON BUTTON ---
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled,
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: tokens.colors.brand[600],
          color: '#FFFFFF',
          border: `1px solid ${tokens.colors.brand[600]}`
        };
      case 'secondary':
        return {
          backgroundColor: tokens.colors.neutral[100],
          color: tokens.colors.neutral[700],
          border: `1px solid ${tokens.colors.neutral[300]}`
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: tokens.colors.brand[600],
          border: `1px solid ${tokens.colors.brand[600]}`
        };
      case 'danger':
        return {
          backgroundColor: tokens.colors.status.error.text,
          color: '#FFFFFF',
          border: `1px solid ${tokens.colors.status.error.text}`
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: tokens.colors.neutral[600],
          border: '1px solid transparent'
        };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return { padding: '6px 12px', fontSize: tokens.typography.fontSize.xs };
      case 'lg':
        return { padding: '12px 24px', fontSize: tokens.typography.fontSize.base };
      default:
        return { padding: '9px 18px', fontSize: tokens.typography.fontSize.sm };
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={{
        fontFamily: tokens.typography.fontFamily,
        fontWeight: tokens.typography.fontWeight.medium,
        borderRadius: tokens.borderRadius.md,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled || isLoading ? 0.6 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.15s ease-in-out',
        outline: 'none',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style
      }}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

// --- INPUT & TEXTAREA ---
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style, id, ...props }) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xs, width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.fontSize.xs,
            fontWeight: tokens.typography.fontWeight.medium,
            color: tokens.colors.neutral[700]
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        style={{
          fontFamily: tokens.typography.fontFamily,
          padding: '8px 12px',
          fontSize: tokens.typography.fontSize.sm,
          borderRadius: tokens.borderRadius.md,
          border: error ? `1px solid ${tokens.colors.status.error.text}` : `1px solid ${tokens.colors.neutral[300]}`,
          outline: 'none',
          backgroundColor: '#FFFFFF',
          color: tokens.colors.neutral[900],
          width: '100%',
          transition: 'border-color 0.15s ease-in-out',
          ...style
        }}
        {...props}
      />
      {error && (
        <span
          style={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.fontSize.xs,
            color: tokens.colors.status.error.text
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

// --- CARD ---
export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      backgroundColor: '#FFFFFF',
      border: `1px solid ${tokens.colors.neutral[200]}`,
      borderRadius: tokens.borderRadius.lg,
      padding: tokens.spacing.md,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      ...style
    }}
  >
    {children}
  </div>
);

// --- STATUS BADGE ---
export interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const getStyles = () => {
    switch (status) {
      case 'success':
        return tokens.colors.status.success;
      case 'warning':
        return tokens.colors.status.warning;
      case 'error':
        return tokens.colors.status.error;
      case 'info':
        return tokens.colors.status.info;
      default:
        return {
          bg: tokens.colors.neutral[50],
          text: tokens.colors.neutral[600],
          border: tokens.colors.neutral[200]
        };
    }
  };

  const s = getStyles();

  return (
    <span
      style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.fontSize.xs,
        fontWeight: tokens.typography.fontWeight.medium,
        padding: '3px 8px',
        borderRadius: tokens.borderRadius.full,
        backgroundColor: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        display: 'inline-flex',
        alignItems: 'center'
      }}
    >
      {label}
    </span>
  );
};

// --- SKELETON ---
export const Skeleton: React.FC<{ height?: string; width?: string; borderRadius?: string }> = ({
  height = '20px',
  width = '100%',
  borderRadius = tokens.borderRadius.sm
}) => (
  <div
    style={{
      height,
      width,
      borderRadius,
      backgroundColor: tokens.colors.neutral[200],
      animation: 'pulse 1.5s infinite ease-in-out'
    }}
  />
);

// --- EMPTY & ERROR STATES ---
export const EmptyState: React.FC<{ title: string; description?: string; action?: React.ReactNode }> = ({
  title,
  description,
  action
}) => (
  <div
    style={{
      textAlign: 'center',
      padding: '40px 20px',
      border: `1px dashed ${tokens.colors.neutral[300]}`,
      borderRadius: tokens.borderRadius.lg
    }}
  >
    <h3
      style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.fontSize.sm,
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.colors.neutral[700],
        margin: '0 0 4px 0'
      }}
    >
      {title}
    </h3>
    {description && (
      <p
        style={{
          fontFamily: tokens.typography.fontFamily,
          fontSize: tokens.typography.fontSize.sm,
          color: tokens.colors.neutral[500],
          margin: '0 0 16px 0'
        }}
      >
        {description}
      </p>
    )}
    {action}
  </div>
);

export const ErrorState: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div
    style={{
      padding: '24px',
      backgroundColor: tokens.colors.status.error.bg,
      border: `1px solid ${tokens.colors.status.error.border}`,
      borderRadius: tokens.borderRadius.lg
    }}
  >
    <h4
      style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.fontSize.sm,
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.colors.status.error.text,
        margin: '0 0 6px 0'
      }}
    >
      Error Occurred
    </h4>
    <p
      style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.fontSize.sm,
        color: tokens.colors.status.error.text,
        margin: '0 0 12px 0'
      }}
    >
      {message}
    </p>
    {onRetry && (
      <Button variant="danger" size="sm" onClick={onRetry}>
        Retry
      </Button>
    )}
  </div>
);

export const AccessDeniedState: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
    <h2
      style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.fontSize.xl,
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.colors.neutral[900]
      }}
    >
      Access Denied
    </h2>
    <p
      style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.fontSize.sm,
        color: tokens.colors.neutral[500],
        marginTop: '8px'
      }}
    >
      You do not have permission to view or manage this resource. Please contact your hospital administrator.
    </p>
  </div>
);

export const OfflineState: React.FC = () => (
  <div
    style={{
      padding: '12px 16px',
      backgroundColor: tokens.colors.status.warning.bg,
      borderBottom: `1px solid ${tokens.colors.status.warning.border}`,
      textAlign: 'center'
    }}
  >
    <span
      style={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.fontSize.sm,
        color: tokens.colors.status.warning.text,
        fontWeight: tokens.typography.fontWeight.medium
      }}
    >
      Network Disconnected — You are currently viewing offline cached health records.
    </span>
  </div>
);
export * from './modal';
