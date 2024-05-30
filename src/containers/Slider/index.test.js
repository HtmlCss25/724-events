import { render, screen, waitFor } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });
});

describe('When slider changes slide', () => {
  describe('and try to display an image after the last image', () => {
    it('The first one is displayed', async () => {
      window.console.error = jest.fn();

      api.loadData = jest.fn().mockReturnValue(data);

      render(
        <DataProvider>
          <Slider />
        </DataProvider>
      );

      jest.useFakeTimers();
      jest.advanceTimersByTime(15000);

      await waitFor(()=>{
        expect(screen.getByText("World economic forum")).toBeInTheDocument();
      })
    });
  });
  it('the correct bullet point is checked', async()=>{

    window.console.error = jest.fn();
    jest.useFakeTimers();

    api.loadData = jest.fn().mockReturnValue(data);

    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    await screen.findByText("World economic forum");
    
    
    const bullet0 = screen.getByTestId("bullet-0");
    const bullet1 = screen.getByTestId("bullet-1");
    const bullet2 = screen.getByTestId("bullet-2");

    await waitFor(() => {

      // Additional checks for bullet points
      expect(bullet0).toHaveClass("checked");
    });

    jest.advanceTimersByTime(6000);

    expect(screen.getByText("World Gaming Day")).toBeInTheDocument();
    
    await waitFor(()=>{
      
      expect(screen.getByTestId("bullet-1")).toHaveClass("checked");
    })

  })
});