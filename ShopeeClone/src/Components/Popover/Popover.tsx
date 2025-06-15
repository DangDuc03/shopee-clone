import React, { useRef, useState, type ElementType } from 'react'
import {
  FloatingPortal,
  FloatingArrow,
  arrow,
  useFloating,
  autoUpdate,
  shift,
  offset,
  type Placement
} from '@floating-ui/react'
import { motion, AnimatePresence } from 'motion/react'
interface IPopover {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({
  children,
  renderPopover,
  className,
  as: Element = 'div',
  initialOpen,
  placement
}: IPopover) {
  const arrowRef = useRef(null)
  const [open, setOpen] = useState(initialOpen || false)
  const { refs, x, y, strategy, context } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    placement: placement || 'bottom-end'
  })

  const showPopover = () => {
    setOpen(true)
  }

  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <Element className={className} onMouseEnter={showPopover} onMouseLeave={hidePopover} ref={refs.setReference}>
      {children}
      {/* tooltip */}
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${context?.middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
            >
              <FloatingArrow ref={arrowRef} context={context} fill='white' />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
