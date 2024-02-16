import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Study } from "../Study"
import React from "react"
import "@testing-library/jest-dom";

test("タイトルが表示されること", () => {
    render(<Study />)
    const title = screen.getByTestId("title")
    expect(title).toHaveTextContent("学習記録一覧")
})

test("入力をしないで登録を押すとエラーが表示される", () => {
    render(<Study />)
    // 登録ボタンを取得してクリックする
    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    // エラーメッセージが表示されることを確認
    const errorMessage = screen.queryByText('入力されていない項目があります。');
    expect(errorMessage).toBeInTheDocument();
})

test("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加される", async () => {
    render(<Study />);

    // 学習内容と時間の入力フィールドを取得
    const contentInput = screen.getByTestId("study-content-input");
    const timeInput = screen.getByTestId("study-time-input");

    // 学習内容と時間を入力
    fireEvent.change(contentInput, { target: { value: "テスト学習内容" } });
    fireEvent.change(timeInput, { target: { value: "10" } });

    // 登録ボタンをクリック
    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    // 新しい学習記録がリストに追加されたことを確認
    await waitFor(() => {
        const newRecord = screen.getByText("テスト学習内容 10時間");
        expect(newRecord).toBeInTheDocument();
    });
});

test("削除ボタンを押すと学習記録が削除される", async () => {
    render(<Study />);

    // 削除ボタンが表示されるまで待機
    await waitFor(() => {
        const deleteButtons = screen.getAllByTestId("delete");
        expect(deleteButtons.length).toBeGreaterThan(0);
    });

    // 初期の学習記録の数を取得
    const initialRecords = screen.getAllByTestId("record");

    // 削除ボタンクリック
    const deleteButton = screen.getAllByTestId("delete")[0];
    fireEvent.click(deleteButton);

    // 削除後の学習記録の数を取得
    await waitFor(() => {
        const updatedRecords = screen.queryAllByTestId("record");
        expect(updatedRecords.length).toBe(initialRecords.length - 1);
    });
});