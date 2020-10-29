import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { render, cleanup, getAllByTestId, getAllByDisplayValue, getAllByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

const mock_tasks = [
    { id: "todo-0", name: "task1", completed: true },
    { id: "todo-1", name: "task2", completed: false },
    { id: "todo-2", name: "task3", completed: false }]

    
describe("App.js", function () {
    //Snapshot checker
    it("App component matches snapshot", () => {
      const componet = renderer.create(<App tasks={mock_tasks} />);
      const test_snap = componet.toJSON();
      expect(test_snap).toMatchSnapshot();
    });

    //Renders the site with 0 tasks
    it("App component should render with 0 tasks and not crash", function () {
      const component = renderer.create(<App tasks = {[]}/>);
      const testInstance = component.toJSON();
      expect(testInstance.children[3].children).toBe(null);
     });

    //Checking 3 tasks appear for the user as the default
    it("3 todo tasks should exist with mock data", function () {
        const component = renderer.create(<App tasks = {mock_tasks} />);
        const testInstance = component.toJSON();
        expect(testInstance.children[3].children.length).toBe(3);
    });

    //Checking 3 tasks appear in the header as the default
    it("Header should show correct number of tasks - 3 by default", () => {
      const { getByTestId } = render(<App tasks={mock_tasks} />);
      const headingText = getByTestId("list-heading");
      expect(headingText.textContent).toBe("3 tasks remaining");
    });
});
