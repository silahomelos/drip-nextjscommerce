import React, {
  Children,
  isValidElement,
  InputHTMLAttributes,
  DetailedHTMLProps,
  useState,
  HTMLAttributes,
  useEffect,
  ReactNode,
} from 'react'
import Tab from '../Tab'
import cn from 'classnames'
import s from './Tab.module.scss'

export interface SubProps {
  props: {
    children: (string | Element)[]
    label: any
  }
}

export interface Props {
  children: Array<SubProps>
}

const Tabs: React.FC<Props> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label)

  const onClickTabItem = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="tabs">
      <ol className="tab-list">
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            const { label } = child.props
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            )
          }
        })}
      </ol>
      <div className="tab-content">
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            if (child.props.label !== activeTab) return undefined
            return child.props.children
          }
        })}
      </div>
    </div>
  )
}

export default Tabs
