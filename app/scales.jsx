import React from 'react'

export const Scales = () => {
  return (
    <>
        <div className="absolute right-0 top-0 h-full w-8 border-x border-[var(--pattern-fg)]
            bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
            [background-size:10px_10px] bg-fixed">
        </div>
        <div className="absolute left-0 top-0 h-full w-8 border-x border-[var(--pattern-fg)]
            bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
            [background-size:10px_10px] bg-fixed">
        </div>
    </>
  )
}
