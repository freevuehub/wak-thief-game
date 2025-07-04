import { useStore } from '@/hooks'

const Side: React.FC = () => {
  const { thieves } = useStore()

  return (
    <div className="fixed top-0 left-0 w-[300px] bottom-0 bg-gray-800 p-2">
      <h1 className="text-2xl font-display text-red-500">Syndicate</h1>
      <ul>
        {thieves.map((thief) => (
          <li key={thief.id}>{thief.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Side
