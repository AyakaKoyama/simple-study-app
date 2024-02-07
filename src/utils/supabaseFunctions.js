import { supabase } from "./supabase"


export const getAllRecords = async () => {

    const records = await supabase.from("study-record").select("*");
    return records.data;
}


export const addAllRecords = async (studyContent, studyTime) => {
    await supabase
        .from('study-record')
        .insert([
            { studyContent, studyTime },
        ])
        .select()
}

export const deleteRecords = async (studyContent, studyTime) => {
    await supabase
      .from('study-record')
      .delete()
      .match({ studyContent, studyTime });    
  };