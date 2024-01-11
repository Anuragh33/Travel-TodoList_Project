import { useState } from "react"
import Logo from "./Logo.js"
import Form from "./Form.js"
import Item from "./Item.js"
import PackingList from "./PackingList.js"
import Stats from "./Stats.js"

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

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    )

    if (confirmed) setItems([])
  }

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
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}
