import { useEffect, useState } from 'react'
import React from "react";
import { getAllRecords, addAllRecords, deleteRecords } from './utils/supabaseFunctions';

export const Study = () => {

  //const [records, setRecords] = useState([]);
  const [studyContent, setStudyContent] = useState("");
  const [studyTime, setStudyTime] = useState(0);
  const [error, setError] = useState("");
  const [recordList, setRecordList] = useState([]);
  //データセット
  useEffect(() => {
    const getRecords = async () => {
      try {
        const records = await getAllRecords();
        setRecordList(records);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getRecords();
  },
    [])


  //登録ボタン押下
  const onAddRecord = async () => {
    if (!studyTime && !studyContent) {
      setError("入力されていない項目があります。");
      return;
    }

    if (studyContent === "") {
      setError("学習内容を入力してください");
      return;
    }
    if (!studyTime) {
      setError("学習時間を入力してください");
      return;
    }
    //データ追加
    try {
      const data = await addAllRecords(studyContent, studyTime);
      const newRecord = { id: data.id, studyContent: studyContent, studyTime: studyTime };
      setRecordList([...recordList, newRecord]);
      setStudyContent("");
      setStudyTime(0);
      setError("");
    } catch (error) {
      console.error("Error adding record:", error);
      setError("レコードの追加中にエラーが発生しました");
    }
  };

  const onChangeStudyContent = (event) => {
    const inputContent = event.target.value;
    setStudyContent(inputContent);
    setError(""); //値が入力されたらエラーを初期化し非表示にする
  };
  const onChangeStudyTime = (event) => {
    const inputValue = event.target.value;
    if (/^\d*$/.test(inputValue)) {
      setStudyTime(parseInt(inputValue));
      setError("学習時間を入力してください");
      setError(""); //値が入力されたらエラーを初期化し非表示にする
    }
  };

  const totalTime = recordList.reduce(
    (acc, record) => acc + parseInt(record.studyTime, 10),
    0
  );

  //削除ボタン
  const onClickDelete = async (id) => {
    try {
      await deleteRecords(id);
      const newRecords = recordList.filter((r) => r.id !== id);
      setRecordList(newRecords);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <>
      <div>
        <h1 data-testid="title">学習記録一覧</h1>
        <div>
          <input
            placeholder="学習内容"
            value={studyContent}
            onChange={onChangeStudyContent}
            data-testid="study-content-input"
          />
        </div>
        <div>
          <input
            placeholder="学習時間"
            type="number"
            value={studyTime}
            onChange={onChangeStudyTime}
            data-testid="study-time-input"
          />
          <button onClick={onAddRecord} data-testid="submit">登録</button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          学習内容:{studyContent} 時間: {studyTime}
        </div>
        <ul>

          {recordList.map((recordData, index) => {
            return (
              <li key={recordData.id} data-testid="record">
                <div>
                  <p >{`${recordData.studyContent} ${recordData.studyTime}時間`}</p>
                  <button onClick={() => onClickDelete(recordData.id)} data-testid="delete">削除</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <p>
        合計時間:
        {totalTime}
        /1000(h)
      </p>
    </>
  );
};
