import React, { InputHTMLAttributes, useState, useEffect } from 'react'
import cn from 'classnames'
import s from './Tab.module.scss'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  activeTab?: string
  label?: string
  onClick?: (...args: any[]) => any
}

const Tab: React.FC<Props> = (props) => {
  const { className, activeTab, label, onClick, ...rest } = props
  const [tabClassName, setTabClassName] = useState('tab-list-item')

  useEffect(() => {
    setTabClassName(tabClassName + ' tab-list-active')
  }, [activeTab])

  const onClickHandler = () => {
    if (onClick) {
      onClick(label)
    }
  }

  return (
    <li className={cn(className, tabClassName)} onClick={onClickHandler}>
      {label}
    </li>
  )
}

export default Tab
