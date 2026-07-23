import React from 'react';

// Common base styles
const baseFontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';

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
        return { backgroundColor: '#0369A1', color: '#FFFFFF', border: '1px solid #0369A1' };
      case 'secondary':
        return { backgroundColor: '#F1F5F9', color: '#334155', border: '1px solid #CBD5E1' };
      case 'outline':
        return { backgroundColor: 'transparent', color: '#0369A1', border: '1px solid #0369A1' };
      case 'danger':
        return { backgroundColor: '#DC2626', color: '#FFFFFF', border: '1px solid #DC2626' };
      case 'ghost':
        return { backgroundColor: 'transparent', color: '#475569', border: '1px solid transparent' };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return { padding: '6px 12px', fontSize: '13px' };
      case 'lg':
        return { padding: '12px 24px', fontSize: '16px' };
      default:
        return { padding: '9px 18px', fontSize: '14px' };
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={{
        fontFamily: baseFontFamily,
        fontWeight: 500,
        borderRadius: '6px',
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled || isLoading ? 0.6 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.15s ease-in-out',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
      {label && (
        <label htmlFor={inputId} style={{ fontFamily: baseFontFamily, fontSize: '13px', fontWeight: 500, color: '#334155' }}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        style={{
          fontFamily: baseFontFamily,
          padding: '8px 12px',
          fontSize: '14px',
          borderRadius: '6px',
          border: error ? '1px solid #DC2626' : '1px solid #CBD5E1',
          outline: 'none',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          width: '100%',
          ...style
        }}
        {...props}
      />
      {error && <span style={{ fontFamily: baseFontFamily, fontSize: '12px', color: '#DC2626' }}>{error}</span>}
    </div>
  );
};

// --- CARD ---
export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      padding: '20px',
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
        return { bg: '#F0FDF4', color: '#166534', border: '#BBF7D0' };
      case 'warning':
        return { bg: '#FFFBEB', color: '#92400E', border: '#FDE68A' };
      case 'error':
        return { bg: '#FEF2F2', color: '#991B1B', border: '#FECACA' };
      case 'info':
        return { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' };
      default:
        return { bg: '#F8FAFC', color: '#475569', border: '#E2E8F0' };
    }
  };

  const s = getStyles();

  return (
    <span
      style={{
        fontFamily: baseFontFamily,
        fontSize: '12px',
        fontWeight: 500,
        padding: '3px 8px',
        borderRadius: '9999px',
        backgroundColor: s.bg,
        color: s.color,
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
  borderRadius = '4px'
}) => (
  <div
    style={{
      height,
      width,
      borderRadius,
      backgroundColor: '#E2E8F0',
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
  <div style={{ textAlign: 'center', padding: '40px 20px', border: '1px dashed #CBD5E1', borderRadius: '8px' }}>
    <h3 style={{ fontFamily: baseFontFamily, fontSize: '16px', fontWeight: 600, color: '#334155', margin: '0 0 4px 0' }}>
      {title}
    </h3>
    {description && (
      <p style={{ fontFamily: baseFontFamily, fontSize: '14px', color: '#64748B', margin: '0 0 16px 0' }}>
        {description}
      </p>
    )}
    {action}
  </div>
);

export const ErrorState: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div style={{ padding: '24px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px' }}>
    <h4 style={{ fontFamily: baseFontFamily, fontSize: '15px', fontWeight: 600, color: '#991B1B', margin: '0 0 6px 0' }}>
      Error Occurred
    </h4>
    <p style={{ fontFamily: baseFontFamily, fontSize: '14px', color: '#7F1D1D', margin: '0 0 12px 0' }}>{message}</p>
    {onRetry && (
      <Button variant="danger" size="sm" onClick={onRetry}>
        Retry
      </Button>
    )}
  </div>
);

export const AccessDeniedState: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
    <h2 style={{ fontFamily: baseFontFamily, fontSize: '20px', fontWeight: 600, color: '#0F172A' }}>
      Access Denied
    </h2>
    <p style={{ fontFamily: baseFontFamily, fontSize: '14px', color: '#64748B', marginTop: '8px' }}>
      You do not have permission to view or manage this resource. Please contact your hospital administrator.
    </p>
  </div>
);

export const OfflineState: React.FC = () => (
  <div style={{ padding: '12px 16px', backgroundColor: '#FFFBEB', borderBottom: '1px solid #FDE68A', textAlign: 'center' }}>
    <span style={{ fontFamily: baseFontFamily, fontSize: '13px', color: '#92400E', fontWeight: 500 }}>
      Network Disconnected — You are currently viewing offline cached health records.
    </span>
  </div>
);
