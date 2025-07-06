type Props = {
  children: React.ReactNode
}

const Section: React.FC<Props> = (props) => {
  return <div className="mt-4 pt-4 border-t border-gray-200/50">{props.children}</div>
}

export default Section
