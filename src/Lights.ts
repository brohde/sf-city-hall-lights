import moment from 'moment';
import * as NotionApi from './NotionApi';

const TODAY = () => moment().format('YYYY-MM-DD');

interface ShortcutsResponse {
  status: 'found' | 'notfound' | 'error',
  data: NotionApi.CleanedScheduleRow,
  say: string
}

/**
 * Reads from Notion schedule page 
 * @returns 
 */
export async function today() {
  const res = await NotionApi.getScheduleRow(TODAY());
  const data = NotionApi.cleanScheduleRow(res);

  const forSiri: ShortcutsResponse = {
    status: 'found',
    data,
    say: 'Hello I will write more here.'
  }

  return forSiri;
}
