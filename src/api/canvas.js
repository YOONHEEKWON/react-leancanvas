import { canvases } from './http';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
// 목록
export async function getCanvases(params) {
  const payload = Object.assign(
    {
      _sort: 'lastModified', //json -server
      _order: 'desc', //json -server
    },
    params,
  );
  const { data } = await canvases.get('/', { params: payload });
  return data;
}

export function createCanvas() {
  const newCanvas = {
    title: uuidv4().substring(0, 4) + '_새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };
  return canvases.post('/', newCanvas);
}
//저장, 수정 ,삭제

export async function deleteCanvas(id) {
  await canvases.delete(`/${id}`);
}

export async function getCanvasById(id) {
  const { data } = await canvases.get(`/${id}`);
  return data;
}

export async function updateTitle(id, title) {
  /**
   * post - 새로운 자원 생성
   * put - 기존 자원 전체 업데이트 또는 새 자원 생성
   * patch - 기존 자원 일부 수정
   */

  await canvases.patch(`/${id}`, { title });
}
export async function updateCanvas(id, canvas) {
  await canvases.put(`/${id}`, canvas);
}