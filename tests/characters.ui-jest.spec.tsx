import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import CharacterList from "../pages";

const mockData = {
  results: [
    { id: 1, name: "Rick Sanchez", image: "rick.png" },
    { id: 2, name: "Morty Smith", image: "morty.png" },
  ],
  info: {
    next: "https://rickandmortyapi.com/api/character?page=2",
    prev: null,
  },
};

test("renders character list", () => {
  render(<CharacterList initialData={mockData} />);
  expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  expect(screen.getByText("Morty Smith")).toBeInTheDocument();
});

test("handles pagination buttons", async () => {
  global.fetch = jest.fn((): any =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );

  const { getByText } = render(<CharacterList initialData={mockData} />);
  const nextButton = getByText("Next");
  nextButton.click();
  expect(global.fetch).toHaveBeenCalledWith(mockData.info.next);
});

test("matches snapshot", () => {
  const { asFragment } = render(<CharacterList initialData={mockData} />);
  expect(asFragment()).toMatchSnapshot();
});

// test("is accessible", async () => {
//   const { container } = render(<CharacterList initialData={mockData} />);
//   const results = await axe(container);
//   expect(results).toHaveNoViolations();
// });
