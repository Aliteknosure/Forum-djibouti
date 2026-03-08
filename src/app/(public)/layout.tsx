import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { LangProvider } from '@/context/LangContext'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <Header />
      {children}
      <Footer />
    </LangProvider>
  )
}
