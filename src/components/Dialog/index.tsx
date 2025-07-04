type Props = {
  children: React.ReactNode
}

const Dialog: React.FC<Props> = (props) => {
  return (
    <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-gray-900/70 z-50 px-8 backdrop-blur-sm">
      {props.children}
    </div>
  )
}

export default Dialog
