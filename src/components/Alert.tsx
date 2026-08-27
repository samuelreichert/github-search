import { CircleAlert } from 'lucide-react'

export function Alert({ message }: { message: string }) {
  return (
    <div className="content-card border-amber-200 bg-amber-50 p-6 text-center text-amber-900">
      <CircleAlert className="mx-auto mb-3" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}
