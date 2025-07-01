import React, { useState, useEffect } from 'react'

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

interface CountDownProps {
  initialTime?: TimeLeft
  flashThresholdInMinutes?: number
  className?: string
}

const CountDown: React.FC<CountDownProps> = ({
  initialTime = { hours: 1, minutes: 29, seconds: 43 },
  flashThresholdInMinutes = 5,
  className = ''
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTime)
  const [isFlashing, setIsFlashing] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          // Khi hết thời gian, reset lại initialTime
          setIsFlashing(false)
          return initialTime
        }

        const totalMinutesLeft = hours * 60 + minutes
        if (totalMinutesLeft < flashThresholdInMinutes) {
          setIsFlashing(true)
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [initialTime, flashThresholdInMinutes])

  const formatNumber = (num: number): string => num.toString().padStart(2, '0')

  return (
    <div
      className={`ml-2 h-full flex items-center justify-center text-xl ${
        isFlashing ? 'animate-pulse' : ''
      } ${className}`}
    >
      <div className='w-5'>
        <div className='font-bold leading-none'>{formatNumber(timeLeft.hours)}</div>
      </div>
      <span className='text-white font-bold text-xl px-2'>:</span>
      <div className='w-5'>
        <div className='font-bold leading-none'>{formatNumber(timeLeft.minutes)}</div>
      </div>
      <span className='text-white font-bold text-xl px-2'>:</span>
      <div className='w-5 transform transition-transform duration-150 hover:scale-105'>
        <div className='font-bold leading-none'>{formatNumber(timeLeft.seconds)}</div>
      </div>
    </div>
  )
}

export default CountDown
