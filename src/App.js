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
  const [items, setItems] = useState(initialItems)

  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }
  return (
    <div>
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
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

function Form({ onAddItem }) {
  const [description, setDescription] = useState("")

  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()

    if (!description) return
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Math.floor(Math.random() * 10000),
    }

    setDescription("")
    setQuantity(1)

    onAddItem(newItem)
    // console.log(newItem)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>You need these for your trip.</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
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
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats({ items }) {
  const numItems = items.length

  if (!numItems)
    return (
      <footer className="stats">
        <p>Start adding items to your bag!!</p>
      </footer>
    )
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
