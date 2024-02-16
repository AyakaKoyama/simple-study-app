import { render,screen } from "@testing-library/react"
import { Study } from "../Study"
import React from "react"
import "@testing-library/jest-dom";

test("タイトルが表示されること",()=>{
    render(<Study />)
    const title = screen.getByTestId("title")
    expect(title).toHaveTextContent("学習記録一覧")
})