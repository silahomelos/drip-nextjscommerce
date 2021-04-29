import { FC } from 'react'
import { AmbassadorsBoard } from '@components/ambassadors'
import { Layout } from '@components/common'

const Ambassadors: FC = () => {
  return (
    <div>
      <AmbassadorsBoard />
    </div>
  )
}

Ambassadors.Layout = Layout
export default Ambassadors
