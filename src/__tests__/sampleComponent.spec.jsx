import { fireEvent, render,screen } from "@testing-library/react"
import { Study } from "../Study"
import React from "react"
import "@testing-library/jest-dom";

test("タイトルが表示されること",()=>{
    render(<Study />)
    const title = screen.getByTestId("title")
    expect(title).toHaveTextContent("学習記録一覧")
})

test("入力をしないで登録を押すとエラーが表示される",()=>{
    render(<Study />)
    // 登録ボタンを取得してクリックする
    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    // エラーメッセージが表示されることを確認
    const errorMessage = screen.queryByText('入力されていない項目があります。');
    expect(errorMessage).toBeInTheDocument();
})