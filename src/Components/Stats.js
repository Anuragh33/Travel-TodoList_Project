import { useState } from "react"

export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items to your bag!!</em>
      </p>
    )

  const numItems = items.length
  const numPacked = items.filter((items) => items.packed).length

  const percentagePacked = Math.floor((numPacked / numItems) * 100)

  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? "You are good to go!!"
          : `
        You have ${numItems} items in your bag and ${numPacked} items are already
        packed. (${percentagePacked})%`}
      </em>
    </footer>
  )
}
