import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      const submitButton = await screen.findByText("Envoyer");
      fireEvent.click(submitButton);
      await screen.findByText("En cours");
      await waitFor(()=>{
        expect(screen.findByText("Message envoyé !"));
      })
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    
    render(<Home />);
    await screen.findByTestId("events");

  })
  it("a list a people is displayed", async () => {
    render(<Home/>);

    const container = await screen.findByTestId('people-container');
    expect(container).toBeInTheDocument();

    const eventCards = container.querySelectorAll('.PeopleCard');
    expect(eventCards.length).toBeGreaterThan(0);

  })
  it("a footer is displayed", async () => {
    render(<Home/>);
    await screen.findByTestId('bottom-footer');
  })
  it("an event card, with the last event, is displayed", async () => {

    render(<Home/>);
    const lastEvent = screen.getByTestId("card-testid");
    expect(lastEvent).toBeInTheDocument();
    await waitFor(()=>{
      expect(screen.findByText("août"));
    })
  })
});
