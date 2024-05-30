import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Form is created", () => {
  it("all fields are displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      
      const submitButton = await screen.findByTestId("button-test-id");
      fireEvent.click(submitButton);
      await waitFor(()=>{
        expect(onSuccess).toHaveBeenCalled();
      })
    });
    it("a message is displayed", async ()=>{
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      
      const submitButton = await screen.findByTestId("button-test-id");
      fireEvent.click(submitButton);
      await waitFor(()=>{
        expect(screen.findByText("Message envoyé !"));
      })
    })
  });
});
