import { clsx } from 'clsx'
import BoardList from './components/BoardList/BoardList'
import './tailwind.css'


const globalStyles = clsx(
  'flex', 'flex-col', 'items-stretch', 'min-h-screen', 'text-center', 'bg-[#474F7A]', 
  'text-gray-900', 'w-screen'
)

function App() {
  return (
    <div className={globalStyles}>
      <BoardList />
    </div>
  );
}

export default App
