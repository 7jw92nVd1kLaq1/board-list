import { clsx } from 'clsx'
import BoardList from './components/BoardList/BoardList'
import './tailwind.css'
import { useEffect } from 'react'
import AddBoardModal from './components/Modals/AddBoardModal/AddBoardModal'
import ListContainer from './components/ListContainer/ListContainer'
import AddTaskModal from './components/Modals/AddTaskModal/AddTaskModal'
import AddListModal from './components/Modals/AddListModal/AddListModal'
import LoggerModal from './components/Modals/LoggerModal/LoggerModal'

import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useTypedDispatch, useTypedSelector } from './hooks/redux'
import { setList } from './stores/slices/boardsSlice'
import { TList, TTask } from './types'

const globalStyles = clsx(
  'flex', 'flex-col', 'items-stretch', 'min-h-screen', 'text-center', 'bg-[#474F7A]', 
  'text-gray-900', 'w-screen'
)

function App() {
  const dispatch = useTypedDispatch();
  const boardsState = useTypedSelector(state => state.boards);

  // Hook for handling drag and drop
  const handleOnDragEnd = (result: DropResult) => {
    let newSourceTasks : TTask[];
    let newDestinationTasks : TTask[];

    const { source, destination, draggableId } = result;
    if (!destination) return;

    const currentBoardId : string = boardsState.currentBoardId;
    const sourceList : TList | undefined = boardsState.boards.find(
      board => board.id === currentBoardId)?.lists.find(list => list.id === source.droppableId);
    const destinationList : TList | undefined = boardsState.boards.find(
      board => board.id === currentBoardId)?.lists.find(list => list.id === destination.droppableId);
    const destinationIndex : number = destination.index;
    if (!sourceList || !destinationList) return;

    const targetTask : TTask | undefined = sourceList.tasks.find(task => task.id === draggableId);
    if (!targetTask) return;

    if (source.droppableId != destination.droppableId) {
      newSourceTasks = sourceList.tasks.filter(task => task.id !== draggableId);
      newDestinationTasks = [...destinationList.tasks];
      newDestinationTasks.splice(destinationIndex, 0, targetTask);
    } else {
      newSourceTasks = [...sourceList.tasks];
      newSourceTasks.splice(source.index, 1);
      newDestinationTasks = [...newSourceTasks];
      newDestinationTasks.splice(destinationIndex, 0, targetTask);
    }

    dispatch(setList({ 
      boardId: currentBoardId, 
      listId: source.droppableId, 
      tasks: newSourceTasks })
    );
    dispatch(setList({ 
      boardId: currentBoardId, 
      listId: destination.droppableId, 
      tasks: newDestinationTasks })
    );
  };

  useEffect(() => {
    document.title = "Your Personal Board";
  });

  return (
    <div className={globalStyles}>
      <BoardList visible={true} fixed={true} />
      <BoardList visible={false} fixed={false} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <ListContainer />
      </DragDropContext>
      <AddBoardModal />
      <AddListModal />
      <AddTaskModal />
      <LoggerModal />
    </div>
  );
}

export default App
