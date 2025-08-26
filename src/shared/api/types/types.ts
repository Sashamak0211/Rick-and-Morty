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

export interface ICharacterListProps {
  id: number;
  name: string;
  gender: string;
  species: string;
  location: string;
  status: string;
  imageSrc: string;
  imageAlt: string;
}

export interface ICharacterCardProps {
  character: ICharacterListProps;
  isEditing?: boolean;
  onEdit?: (id: number) => void;
  onSave: (
    id: number,
    newName: string,
    newLocation: string,
    newStatus: string
  ) => void;
  onCancel?: () => void;
  onClick?: () => void;
}
