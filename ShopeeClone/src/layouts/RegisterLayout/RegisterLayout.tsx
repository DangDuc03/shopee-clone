import Footer from 'src/Components/Footer'
import RegisterHeader from 'src/Components/RegisterHeader'

interface IProps {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: IProps) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
