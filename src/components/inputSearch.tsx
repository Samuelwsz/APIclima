import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, KeyboardEvent } from "react"
interface InputSearchProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
}

export default function InputSearch({
  value,
  onChange,
  onKeyDown,
}: InputSearchProps) {
  return (
    <>
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={onChange /*(event) => setLocation(event.target.value)*/}
          onKeyDown={onKeyDown}
          className="w-full p-2 rounded-2xl border-2 border-gray-300 focus:outline-none outline-none text-xl"
        />
        <MagnifyingGlassIcon className="w-5 h-5 absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
      </div>
    </>
  )
}
