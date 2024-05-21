import { clsx } from 'clsx'
import BoardList from './components/BoardList/BoardList'
import './tailwind.css'
import { useEffect } from 'react'
import AddBoardModal from './components/Modals/AddBoardModal/AddBoardModal'
import ListContainer from './components/ListContainer/ListContainer'
import AddTaskModal from './components/Modals/AddTaskModal/AddTaskModal'
import AddListModal from './components/Modals/AddListModal/AddListModal'
import LoggerModal from './components/Modals/LoggerModal/LoggerModal'


const globalStyles = clsx(
  'flex', 'flex-col', 'items-stretch', 'min-h-screen', 'text-center', 'bg-[#474F7A]', 
  'text-gray-900', 'w-screen'
)

function App() {
  useEffect(() => {
    document.title = 'Share Items'
  });

  return (
    <div className={globalStyles}>
      <BoardList visible={true} fixed={true} />
      <BoardList visible={false} fixed={false} />
      <ListContainer />
      <AddBoardModal />
      <AddListModal />
      <AddTaskModal />
      <LoggerModal />
    </div>
  );
}

export default App
