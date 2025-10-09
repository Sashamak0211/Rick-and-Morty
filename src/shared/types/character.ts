export interface ICharacter {
  id: number;
  name: string;
  gender: string;
  species: string;
  location: string;
  origin?: {
    name: string;
  };
  status: string;
  imageSrc: string;
  imageAlt: string;
  type?: string;
}

export interface ICharacterCardProps {
  character: ICharacter;
  isEditing?: boolean;
  onEdit?: (id: number) => void;
  onSave: (
    id: number,
    newName: string,
    newLocation: string,
    newStatus: string
  ) => void;
  onClick: () => void;
}
