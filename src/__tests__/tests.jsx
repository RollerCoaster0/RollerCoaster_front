import React from "react";
import {render} from "@testing-library/react";
import HomePage from "../components/pages/homepage/HomePage";

test('tests for Homepage', ()=>{
    render(<HomePage />);
    const content = screen.getByText(content)
    expect(content).toBeInTheDocument();
});
test('My first test', () => {
    expect(Math.max(1, 5, 10)).toBe(10);
});