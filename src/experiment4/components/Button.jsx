export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-harbor-600 text-white hover:bg-harbor-800 disabled:bg-harbor-100 disabled:text-harbor-600',
    accent: 'bg-brass-400 text-harbor-900 hover:bg-brass-500',
    ghost: 'text-harbor-600 hover:bg-harbor-50',
    outline: 'border border-white/60 text-white hover:bg-white/10',
  }
  return (
    <button
      {...props}
      className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
