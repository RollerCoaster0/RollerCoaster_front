import {React} from "react";
import {render} from "@testing-library/react";
import HomePage from "./HomePage";

test('tests for Homepage', ()=>{
    render(<HomePage />);
    const content = screen.getElement(content)
    expect(content).toBeInTheDocument();
});