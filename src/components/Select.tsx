import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
interface SelectProps {
  list: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

function Select({ list, value, onChange }: SelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredList = list.filter((pokemon) =>
    pokemon.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  const toggleSelection = (pokemon: string) => {
    if (value.includes(pokemon)) {
      onChange(value.filter((p) => p !== pokemon));
    } else if (value.length < 4) {
      onChange([...value, pokemon]);
    }
  };
  const clearAll = () => {
    onChange([]);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showInput, setShowInput] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (
      containerRef.current &&
      containerRef.current.contains(e.relatedTarget as Node)
    ) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }
    setIsFocused(false);
    if (value.length > 0) setShowInput(false);
  };

  const setFocus = () => {
    if (inputRef.current) {
      console.log("setting focus");
      inputRef.current.focus();
    }
  };
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);
  return (
    <div
      ref={containerRef}
      className="border px-3 py-2 w-full rounded min-h-[42px] relative"
      onClick={() => {
        setShowInput(true);
      }}
    >
      <div className="flex">
        <div className="w-full flex flex-col justify-center">
          <div className="flex flex-wrap gap-1">
            {value?.length > 0 &&
              value.map((pokemon) => (
                <button
                  key={pokemon}
                  type="button"
                  onClick={() => {
                    toggleSelection(pokemon);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {pokemon} ✕
                </button>
              ))}
          </div>
          {value.length < 4 && showInput && (
            <div className="relative w-full">
              <input
                ref={inputRef}
                type="text"
                placeholder={value.length === 0 ? "Search Pokémon..." : ""}
                onFocus={handleFocus}
                autoFocus={showInput && !isFirstRender.current}
                onBlur={handleBlur}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-none outline-none px-3 py-2 rounded"
              />

              {isFocused && (
                <div className="bg-white absolute z-10 w-full mt-1 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredList.map((pokemon) => (
                    <button
                      key={pokemon}
                      onClick={() => {
                        toggleSelection(pokemon);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      disabled={value.includes(pokemon)}
                    >
                      {pokemon}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="w-10 py-2 cursor-pointer flex">
          <XMarkIcon
            className="w-5 h-5"
            onClick={() => {
              clearAll();
            }}
          />
          <ChevronDownIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              setFocus();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Select;
