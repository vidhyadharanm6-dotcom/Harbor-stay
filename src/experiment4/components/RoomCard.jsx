export default function RoomCard({ room, selected, onSelect }) {
  return (
    <label
      className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors ${
        selected ? 'border-harbor-600 bg-harbor-50' : 'border-harbor-100 hover:border-harbor-400'
      }`}
    >
      <div className="flex items-center gap-3">
        <input type="radio" name="roomType" checked={selected} onChange={onSelect} className="accent-harbor-600" />
        <div>
          <p className="font-medium text-harbor-800">{room.type}</p>
        </div>
      </div>
      <span className="text-harbor-800 font-semibold">
        ₹{room.price.toLocaleString('en-IN')}
        <span className="text-xs text-harbor-600 font-normal"> / night</span>
      </span>
    </label>
  )
}
