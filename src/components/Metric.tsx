import type { LucideIcon } from 'lucide-react'

import { formatCount } from '../lib/format'

interface MetricProps {
  icon: LucideIcon
  label?: string
  value: number | string
}

export function Metric({ icon: Icon, label, value }: MetricProps) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
      <span>{typeof value === 'number' ? formatCount(value) : value}</span>
      {label && <span>{label}</span>}
    </span>
  )
}
