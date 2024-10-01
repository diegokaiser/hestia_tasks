const SkeletonTasks = () => {
  return (
    <>
      <div className="skeleton">
        <div className="skeleton__element flex gap-3 items-center justify-start skeleton__task mb-3">
          <div className="skeleton__task-status"></div>
          <div className="skeleton__task-text w-6/12"></div>
        </div>

        <div className="skeleton__element flex gap-3 items-center justify-start skeleton__task mb-3">
          <div className="skeleton__task-status"></div>
          <div className="skeleton__task-text w-8/12"></div>
        </div>

        <div className="skeleton__element flex gap-3 items-center justify-start skeleton__task mb-3">
          <div className="skeleton__task-status"></div>
          <div className="skeleton__task-text w-4/12"></div>
        </div>
      </div>
    </>
  )
}

export default SkeletonTasks
