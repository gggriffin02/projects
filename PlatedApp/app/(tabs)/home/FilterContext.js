import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    ingredients: [],
    cuisine: "",
    servings: "",
    time: "",
    difficulty: "",
  });

  const updateFilters = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  return (
    <FilterContext.Provider value={{ selectedFilters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Default export for the FilterProvider
export default FilterProvider;

export const useFilters = () => {
  return useContext(FilterContext);
};
