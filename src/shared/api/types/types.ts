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

export type ICharacterEditableField = "location" | "name" | "status";

export interface ICharacterCardProps {
  character: ICharacterListProps;
  isEditing: boolean;
  onEdit: (id: number) => void;
  onSave: () => void;
  onCancel: () => void;
  onClick: () => void;
  onFieldChange?: (field: ICharacterEditableField, value: string) => void;
}
