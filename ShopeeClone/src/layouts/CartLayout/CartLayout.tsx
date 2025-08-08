import CartHeader from 'src/Components/CartHeader'
import Footer from 'src/Components/Footer'

interface IProps {
  children?: React.ReactNode
}
export default function CartLayout({ children }: IProps) {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}
