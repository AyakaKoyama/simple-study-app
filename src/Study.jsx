import { useEffect, useState } from 'react'
import React from "react";
import { getAllRecords } from './utils/supabaseFunctions';

export const Study = () => {

  const [records, setRecords] = useState([]);
  //初期値に設定
  const [recordList, setRecordList] = useState(records);

  useEffect(() => {
    const getRecords = async () => {
      try {
        const records = await getAllRecords();
        setRecords(records);
        //
        setRecordList(records); // データベースから取得したデータをrecordListの初期値に設定
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getRecords();
  }, [])

  console.log();

  // recordsが更新されるたびにrecordListも更新
  useEffect(() => {
    setRecordList(records);
  }, [records]);

  const [studyContent, setStudyContent] = useState("");
  const [studyTime, setStudyTime] = useState(0);
  const [error, setError] = useState("");


  const onAddRecord = () => {
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

    const newRecord = {
      title: studyContent,
      time: studyTime,
    };
    const newRecordList = [...recordList, newRecord];
    setRecordList(newRecordList);
    setStudyContent("");
    setStudyTime(0);
    setError("");
  };

  const onChangeStudyContent = (event) => {
    const inputContent = event.target.value;
    setStudyContent(inputContent);
    setError(""); //値が入力されたらエラーを初期化し非表示にする
  };
  const onChangeStudyTime = (event) => {
    const inputValue = event.target.value;
    if (/^\d*$/.test(inputValue)) {
      setStudyTime(inputValue);
      setError("学習時間を入力してください");
      setError(""); //値が入力されたらエラーを初期化し非表示にする
    }
  };

  const totalTime = recordList.reduce(
    (acc, record) => acc + parseInt(record.time, 10),
    0
  );
  return (
    <>
      <div>
        <h1>勉強記録一覧</h1>
        <div>
          <input
            placeholder="学習内容"
            value={studyContent}
            onChange={onChangeStudyContent}
          />
        </div>
        <div>
          <input
            placeholder="学習時間"
            type="number"
            value={studyTime}
            onChange={onChangeStudyTime}
          />
          <button onClick={onAddRecord}>登録</button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          学習内容:{studyContent} 時間: {studyTime}
        </div>
        <ul>
          {/* ここで出力されるはず */}
          {recordList.map((recordData, index) => {
            return (
              <li key={index}>
                <div>
                  <p>{`${recordData.title} ${recordData.time}時間`}</p>
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
