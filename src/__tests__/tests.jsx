import React from "react";
import {render} from "@testing-library/react";
import HomePage from "../components/pages/homepage/HomePage";

test('tests for Homepage', ()=>{
    render(<HomePage />);
    const content = screen.getByText(/Добро пожаловать в мир приключений и фэнтези!/)
    expect(content).toBeInTheDocument();
});

test('hello world', () => {
    const { getByText } = render(<p className="content__grid-item4">Здесь вы сможете погрузиться в захватывающие миры и
        отправиться в
        увлекательные приключения вместе с друзьями. </p>);
    expect(getByText('Здесь вы сможете погрузиться в захватывающие миры и\n' +
        '        отправиться в\n' +
        '        увлекательные приключения вместе с друзьями.')).toBeTruthy();
});