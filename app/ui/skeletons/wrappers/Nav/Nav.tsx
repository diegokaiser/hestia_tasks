const SkeletonNav = () => {
  return (
    <>
      <nav className='nav'>
        <div className="skeleton">
          <div className="skeleton__nav flex items-center justify-between mx-auto my-0 w-11/12">
            <div className="skeleton__nav-avatar flex items-center">
              <div className="skeleton__avatar-img">

              </div>
              <div className="skeleton__avatar-user ml-3">

              </div>
            </div>
            <div className="skeleton__nav-actions">

            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default SkeletonNav
