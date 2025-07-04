import { useContext } from 'react'
import { StoreContext } from '@/provider/Store'

const useStore = () => useContext(StoreContext)

export default useStore
