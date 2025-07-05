type Props = {
  children: React.ReactNode
  isBackgroundClickClose?: boolean
  onBackgroundClick?: () => void
}

const Dialog: React.FC<Props> = (props) => {
  const onBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()

    props.onBackgroundClick?.()
  }
  const onContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div
      onClick={onBackgroundClick}
      className="fixed flex inset-0 py-10 min-h-screen bg-gray-900/70 z-50 px-8 backdrop-blur-sm overflow-y-auto"
    >
      <div className="mx-auto h-fit w-fit" onClick={onContentClick}>
        {props.children}
      </div>
    </div>
  )
}

export default Dialog
