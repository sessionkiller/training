import Modal from "react-modal";
import styled from "styled-components";

// Styled Components
const StyledModal = styled(Modal)`
  background: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  margin: auto;
  position: relative;
  top: 20%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #0070f3;
  text-align: center;
`;

const CharacterImage = styled.img`
  width: 100%;
  max-width: 200px;
  border-radius: 10px;
  display: block;
  margin: 10px auto;
`;

const Text = styled.p`
  font-size: 16px;
  color: #555;
  margin: 5px 0;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }
`;

export default function CharacterModal({
  isOpen,
  onRequestClose,
  character,
}: any) {
  if (!character) return null;

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <Title>{character.name}</Title>
      <CharacterImage src={character.image} alt={character.name} />
      <Text>Status: {character.status}</Text>
      <Text>Species: {character.species}</Text>
      <Text>Location: {character.location?.name}</Text>
      <CloseButton onClick={onRequestClose}>Close</CloseButton>
    </StyledModal>
  );
}
