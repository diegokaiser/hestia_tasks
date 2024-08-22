interface Props {
  tasks: Array<object>
}

const Tasks = ({tasks}: Props) => {
  return (
    <>
      <div className="hs__tasks">
        {tasks ? (
          <>
            {tasks.map(task => {
              <div className="hs__tasks-item">
                
              </div>
            })}
          </>
        ):(
          <></>
        )}
      </div>
    </>
  )
}

export default Tasks
