import * as NotionApi from './NotionApi';

interface ShortcutsResponse {
  status: 'found' | 'notfound' | 'error',
  data?: NotionApi.CleanedScheduleRow,
  say: string
}



/**
 * Reads from Notion schedule page 
 * @returns 
 */
export async function today(): Promise<ShortcutsResponse> {
  try {
    const res = await NotionApi.getScheduleRow();
    const data = NotionApi.cleanScheduleRow(res);
    const colors = data.colors.join(", ");

    let say: string;

    if (data.colors && data.description) {
      say = `The colors are ${colors}. ${data.description}`;
    } else if (data.colors) {
      say = `The colors are ${colors}.`;
    } else if (data.description) {
      say = data.description;
    } else {
      say = "I don't have the information.";
    }

    return {
      status: 'found',
      data,
      say
    }
  } catch(e) {
    return {
      status: 'error',
      say: "Sorry, there was a problem getting the light information."
    }    
  }
}
