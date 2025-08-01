'use client'

interface LoadingProps {
  text?: string
  fullScreen?: boolean
}

export default function Loading({ text = "Loading...", fullScreen = true }: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
        <div 
          className="absolute inset-0 w-16 h-16 border-4 border-purple-400/20 border-r-purple-400 rounded-full animate-spin m-2" 
          style={{animationDirection: 'reverse'}}
        ></div>
      </div>
      {text && (
        <div className="mt-6 text-purple-100 text-xl font-medium text-center">{text}</div>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {content}
      </div>
    )
  }

  return content
}