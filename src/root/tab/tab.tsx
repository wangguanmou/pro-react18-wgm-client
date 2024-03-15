import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React, { useState, useRef } from 'react'
import { Tabs } from 'antd'
import styles from './tab.module.less'

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string
}
type TargetKey = React.MouseEvent | React.KeyboardEvent | string

const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition,
    cursor: 'move',
  }

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  })
}

const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1)
  return { label: `Tab ${id}`, key: id }
})

const RootTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key)
  const [items, setItems] = useState(defaultPanes)
  const newTabIndex = useRef(0)

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id)
        const overIndex = prev.findIndex((i) => i.key === over?.id)
        return arrayMove(prev, activeIndex, overIndex)
      })
    }
  }

  const onChange = (key: string) => {
    setActiveKey(key)
  }
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`
    setItems([...items, { label: 'New Tab', key: newActiveKey }])
    setActiveKey(newActiveKey)
  }
  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey)
    const newPanes = items.filter((pane) => pane.key !== targetKey)
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex]
      setActiveKey(key)
    }
    setItems(newPanes)
  }

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add()
    } else {
      remove(targetKey)
    }
  }

  return (
    <Tabs
      className={styles.tab}
      hideAdd
      onChange={onChange}
      activeKey={activeKey}
      type="editable-card"
      onEdit={onEdit}
      items={items}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
          <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
            <DefaultTabBar {...tabBarProps}>
              {(node) => (
                <DraggableTabNode {...node.props} key={node.key}>
                  {node}
                </DraggableTabNode>
              )}
            </DefaultTabBar>
          </SortableContext>
        </DndContext>
      )}
    />
  )
}

export default RootTabs
