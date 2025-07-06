import { Card } from '@/components'
import { useStore } from '@/hooks'

const StatCard: React.FC = () => {
  const { stat } = useStore()

  return (
    <Card className="fixed top-4 right-4 max-w-md p-4">
      <ul className="flex flex-col gap-2">
        <li>
          <p className="flex gap-2 text-md">
            <span>자금:</span>
            <span className="font-medium text-green-400">${stat.cash.toLocaleString()}</span>
          </p>
        </li>
        <li>
          <p className="flex gap-2 text-md">
            <span>경계:</span>
            <span className="font-medium text-yellow-400">{stat.globalAlertLevel}</span>
          </p>
        </li>
      </ul>
    </Card>
  )
}

export default StatCard
