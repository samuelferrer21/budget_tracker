import Budgetused from '@/components/Dashboard/budgetused'
import Goals from '@/components/Dashboard/goals'
import Stats from '@/components/Dashboard/stats' 
import Transactions from '../../components/Dashboard/transactions'
import { createContext } from 'react'



export default async function page() {
  
  return (
    <main className='bg-base-100'>
        <section id='stats'>
            <Stats/>
        </section>
        <section id="transactions" className='sm:grid sm:grid-cols-2 gap-4'>
            <Transactions/>
            <div className=''>
                <Budgetused/>
                <Goals/>
            </div>
            
        </section>

    </main>
  )
}



