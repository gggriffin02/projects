import Components from "components/recipe_details_component";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Page() {
  const {
    recipe_title,
    the_image,
    servings,
    time,
    difficulty,
    chef_name,
    recipe_id,
  } = useLocalSearchParams();
  return <Components route="(tabs)/home" cameFrom="home" />;
}
