import { render, screen } from "@testing-library/react";
import CharacterModal from "@/components/character-modal";

const mockCharacter = {
  name: "Rick Sanchez",
  image: "rick.png",
  status: "Alive",
  species: "Human",
  location: { name: "Earth" },
};

test("renders character modal with details", () => {
  render(
    <CharacterModal
      isOpen={true}
      onRequestClose={jest.fn()}
      character={mockCharacter}
    />
  );
  expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  expect(screen.getByText("Status: Alive")).toBeInTheDocument();
});

test("calls onRequestClose when close button is clicked", () => {
  const onClose = jest.fn();
  render(
    <CharacterModal
      isOpen={true}
      onRequestClose={onClose}
      character={mockCharacter}
    />
  );
  const closeButton = screen.getByText("Close");
  closeButton.click();
  expect(onClose).toHaveBeenCalled();
});
