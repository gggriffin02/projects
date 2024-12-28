import { supabase } from "backend/supabaseClient"; // Adjust the import path as necessary

export const postRecipeToDatabase = async (recipeData) => {
  const { Name, is_mine, under_construction, image_url } = recipeData;

  console.log("Recipe data being posted:", {
    Name,
    is_mine,
    under_construction,
    image_url,
  });

  // Insert the recipe data into the Recipes table
  const { data, error } = await supabase.from("Recipes").insert([
    {
      Name,
      is_mine,
      under_construction,
      image_url,
    },
  ]);

  console.log("Insert response:", { data, error });

  if (error) {
    console.error("Error inserting to database:", error.message);
    throw new Error(error.message); // Handle the error appropriately
  }

  console.log("Inserted to database:", data);
  return { data, error }; // Return the inserted data if needed
};
