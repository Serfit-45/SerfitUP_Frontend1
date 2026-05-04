export default function ErrorMessage({children} : {children: React.ReactNode}) {
  return (
    <div className="px-4 py-3 text-sm text-red-700 font-medium bg-red-50 border border-red-100 rounded-lg">
      {children}
    </div>
  )
}
