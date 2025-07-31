
export function getThemeClasses(theme: string) {
  switch (theme) {
    case 'dark':
      return {
        background: 'bg-gray-900',
        cardBg: 'bg-gray-800/50',
        sidebarActive: 'bg-blue-500/20 border-l-4 border-blue-500',
        sidebarHover: 'bg-blue-500/10',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-400',
        accent: 'bg-red-500',
        badge: 'bg-red-500 text-white',
        border: 'border-gray-700/50',
        input: 'bg-gray-700/50',
        spinner: 'border-red-400/30 border-t-red-400',
        spinnerSecondary: 'border-red-400/20 border-r-red-400',
        shadow: 'shadow-black/50',
        tableBorder: 'border-gray-700/20',
        tableHover: 'bg-gray-800/20'
      }
    case 'light':
      return {
        background: 'bg-gray-50',
        cardBg: 'bg-white/80',
        sidebarActive: 'bg-blue-500/10 border-l-4 border-blue-500',
        sidebarHover: 'bg-blue-500/5',
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-600',
        accent: 'bg-blue-500',
        badge: 'bg-blue-500 text-white',
        border: 'border-gray-200/50',
        input: 'bg-white',
        spinner: 'border-blue-400/30 border-t-blue-400',
        spinnerSecondary: 'border-blue-400/20 border-r-blue-400',
        shadow: 'shadow-blue-500/15',
        tableBorder: 'border-gray-200/30',
        tableHover: 'bg-gray-100/50'
      }
    case 'violet':
      return {
        background: 'bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950',
        cardBg: 'bg-purple-800/30',
        sidebarActive: 'bg-gradient-to-r from-purple-500/30 to-violet-500/30 border-l-4 border-purple-400',
        sidebarHover: 'bg-purple-500/15',
        textPrimary: 'text-purple-100',
        textSecondary: 'text-purple-300',
        accent: 'bg-gradient-to-r from-purple-500 to-violet-500',
        badge: 'bg-purple-500 text-white',
        border: 'border-purple-400/20',
        input: 'bg-purple-800/40 border-purple-400/40',
        spinner: 'border-purple-400/30 border-t-purple-400',
        spinnerSecondary: 'border-violet-400/20 border-r-violet-400',
        shadow: 'shadow-cyan-400/20',
        tableBorder: 'border-purple-400/10',
        tableHover: 'bg-purple-800/20'
      }
    default:
      return getThemeClasses('dark')
  }
}
