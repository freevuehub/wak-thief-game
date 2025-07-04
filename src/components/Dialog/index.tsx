type Props = {
  children: React.ReactNode
}

const Dialog: React.FC<Props> = (props) => {
  const onBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()

    console.log('close')
  }
  const onContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div
      onClick={onBackgroundClick}
      className="fixed inset-0 min-h-screen flex items-center justify-center bg-gray-900/70 z-50 px-8 backdrop-blur-sm"
    >
      <div onClick={onContentClick}>{props.children}</div>
    </div>
  )
}

export default Dialog
