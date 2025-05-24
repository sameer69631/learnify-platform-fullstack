import React, { useEffect, useState } from 'react'
import paymentApi from '../../apiManager/PaymentApi'
import useUserStore from '../../store/userStore'
import { FiBox } from 'react-icons/fi';
import Dashboard from './Dashboard';

function PaymentsInfo() {
  const [paymentData, setPaymentData] = useState([])
  const { user } = useUserStore()

  useEffect(() => {
    const getPaymentsData = async () => {
      try {
        const response = await paymentApi.getPaymentsByMentorId(user._id)
        setPaymentData(response.data.payments)
      }
      catch (err) {
        console.log(err.message)
      }
    }
    getPaymentsData()
  }, [])

  return (
    <Dashboard>
      <div className='p-5'>
        <h1 className='text-2xl font-semibold mb-3'>All Payments</h1>
        <table className='w-full height-auto shadow-lg'>
          <thead>
            <tr className='text-left'>
              <th className='px-4 py-2 bg-gray-200'>Service Name</th>
              <th className='px-4 py-2 bg-gray-200'>Student Name</th>
              <th className='px-4 py-2 bg-gray-200'>Pay Date And Time</th>
              <th className='px-4 py-2 bg-gray-200'>Price</th>
            </tr>
          </thead>
          {paymentData?.length > 0 && <tbody>
            {paymentData.map((data, index) => (
              <tr>
                <td key={data.serviceName} className='p-2'>{data.serviceName}</td>
                <td key={data.studentName} className='p-2'>{data.studentName}</td>
                <td key={data.dateAndTime} className='p-2'>{data.dateAndTime}</td>
                <td key={data.price} className='p-2'>{data.price}</td>
              </tr>
            ))}
          </tbody>}
        </table>
        {paymentData?.length < 1 && <div className='flex flex-col justify-center items-center h-full p-10'>
          <FiBox size={120} className='m-3' />
          <p className='text-lg font-semibold p-2'>No Data</p>
        </div>}
      </div>
    </Dashboard>
  )
}
export default PaymentsInfo