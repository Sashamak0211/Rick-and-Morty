export type CharacterStatus = "Alive" | "Dead" | "Unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "Unknown";
export type CharacterSpecies =
  | "Human"
  | "Alien"
  | "Humanoid"
  | "Robot"
  | "Cronenberg"
  | "Animal"
  | "Disease"
  | "Mythology"
  | "Unknown";

export interface ICharacterCardProps {
  id: number;
  name: string;
  gender: string;
  species: string;
  location: string;
  status: string;
  imageSrc: string;
  imageAlt: string;
}
