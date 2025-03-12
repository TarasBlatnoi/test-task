import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

export interface SelectProps {
  list: string[];
  value: string[];
  onChange: (value: string[]) => void;
  maxSelections?: number;
  placeholder?: string;
}

function Select({
  list,
  value,
  onChange,
  maxSelections = 4,
  placeholder = "Search Pokémon...",
}: SelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredList = list.filter((item) =>
    item.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const toggleSelection = (item: string) => {
    if (value.includes(item)) {
      onChange(value.filter((p) => p !== item));
    } else if (value.length < maxSelections) {
      onChange([...value, item]);
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
              value.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    toggleSelection(item);
                  }}
                  className="bg-blue-300 text-blue-600 px-[10px] py-0.5 rounded-full text-sm flex items-center"
                >
                  {item}
                  <XMarkIcon className="w-4 h-4" />
                </button>
              ))}
          </div>
          {value.length < maxSelections && showInput && (
            <div className="relative w-full">
              <input
                ref={inputRef}
                type="text"
                placeholder={value.length === 0 ? placeholder : ""}
                onFocus={handleFocus}
                autoFocus={showInput && !isFirstRender.current}
                onBlur={handleBlur}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-none outline-none px-3 py-2 rounded"
              />

              {isFocused && (
                <div className="bg-white absolute z-10 w-full mt-1 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredList.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        toggleSelection(item);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      disabled={value.includes(item)}
                    >
                      {item}
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
