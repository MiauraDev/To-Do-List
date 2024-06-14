import React from 'react'

interface ProgressCircleProps {
  total: number
  completed: number
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  total,
  completed,
}) => {
  const percentage = total === 0 ? 0 : (completed / total) * 100
  const strokeDasharray = 2 * Math.PI * 93.5
  const strokeDashoffset =
    total === 0
      ? strokeDasharray
      : strokeDasharray - (strokeDasharray * percentage) / 100

  return (
    <svg
      width="157"
      height="157"
      viewBox="0 0 207 207"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        r="93.5"
        cx="103.5"
        cy="103.5"
        fill="transparent"
        stroke="#efeeee"
        strokeWidth="16"
        strokeDasharray={strokeDasharray}
        strokeDashoffset="0"
      />
      <circle
        r="93.5"
        cx="103.5"
        cy="103.5"
        stroke="#ff6aa0"
        strokeWidth="15"
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        fill="transparent"
      />
      <text
        x="103.5"
        y="103.5"
        fill="#ff6aa0"
        fontSize="48px"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
        transform="rotate(0 103.5 103.5)"
      >
        {total === 0 ? '---%' : `${Math.round(percentage)}%`}
      </text>
    </svg>
  )
}

export { ProgressCircle }
