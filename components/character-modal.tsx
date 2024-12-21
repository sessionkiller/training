import Modal from "react-modal";

export default function CharacterModal({
  isOpen,
  onRequestClose,
  character,
}: any) {
  if (!character) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Location: {character.location?.name}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}
