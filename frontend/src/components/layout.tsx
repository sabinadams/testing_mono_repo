import Header from './header'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <main className="px-6 py-6 w-full h-full flex-1">{children}</main>
    </div>
  )
}

export default Layout
