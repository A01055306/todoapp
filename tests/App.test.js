import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer/package";
import "@testing-library/jest-dom";
import App from "../App";

const mock_tasks = [
    { id: "todo-0", name: "task1", completed: true },
    { id: "todo-1", name: "task2", completed: false },
    { id: "todo-2", name: "task3", completed: false }
]

afterEach(cleanup);
describe("The App component should be rendered successfully", () => {
  it("App component snapshot test", () => {
    const component = renderer.create(<App tasks={mockData} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("App.js", function () {
    it("App component rendered without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<App tasks={mockData} />, div);
        ReactDOM.unmountComponentAtNode(div);
      });

    const NO_TASKS = [];
    it("App should have 3 tasks by default, 1 done, 2 unfinished ", function () {
        const component = renderer.create(<App tasks = {mock_tasks} />);
        const testInstance = component.toJSON();
        expect(testInstance.children[3].children.length).toBe(3);
    });

});
