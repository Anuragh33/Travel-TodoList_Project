import { useState } from "react"

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Shoes", quantity: 2, packed: false },
  { id: 4, description: "glasses", quantity: 2, packed: false },
  { id: 5, description: "Spoons", quantity: 100, packed: false },
  { id: 6, description: "towel", quantity: 3, packed: true },
  { id: 7, description: "pan", quantity: 1, packed: false },
]

export default function App() {
  return (
    <div>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )
}

function Logo() {
  return (
    <div>
      <h1>Travel Pickup 🚗</h1>
    </div>
  )
}

function Form() {
  const [description, setDescription] = useState("")

  const [qty, setQty] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()

    if (!description) return
    const newItem = {
      description,
      qty,
      packed: false,
      id: Math.floor(Math.random() * 10000),
    }

    setDescription("")
    setQty(1)
    // console.log(newItem)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>You need these for your trip.</h3>
      <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>add</button>
    </form>
  )
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      you have X item in your bag and you need Y more.
    </footer>
  )
}
