import Footer from 'src/Components/Footer'
import Header from 'src/pages/Header'

interface IProps {
  children?: React.ReactNode
}

export default function MainLayout({ children }: IProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
