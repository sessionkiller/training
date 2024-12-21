import { render, screen, fireEvent } from "@testing-library/react";
import CharacterList from "@/pages/characters";

const mockData = {
  results: [{ id: 1, name: "Rick Sanchez", image: "rick.png" }],
  info: { next: null, prev: null },
};

global.fetch = jest.fn((): any =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        name: "Rick Sanchez",
        image: "rick.png",
        status: "Alive",
        species: "Human",
        location: { name: "Earth" },
      }),
  })
);

test("opens modal with character details on click", async () => {
  render(<CharacterList initialData={mockData} />);
  fireEvent.click(screen.getByText("Rick Sanchez"));
  expect(await screen.findByText("Status: Alive")).toBeInTheDocument();
});
