import { supabase } from "./supabase"


export const getAllRecords = async () => {

    const records = await supabase.from("study-record").select("*");
    return records.data;
}


export const addAllRecords = async (studyContent, studyTime) => {
    const response = await supabase
        .from('study-record')
        .insert([
            { studyContent, studyTime },
        ])
        .select()
    return (response.data[0])
}

export const deleteRecords = async (id) => {
    await supabase
        .from('study-record')
        .delete()
        .match({ id });
};